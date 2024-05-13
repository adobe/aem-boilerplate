/*
 * Copyright 2022 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

var storage = window.sessionStorage;

function murmurhash3_32_gc(key, seed) {
  var remainder = key.length & 3;
  var bytes = key.length - remainder;
  var c1 = 0xcc9e2d51;
  var c2 = 0x1b873593;
  var h1 = seed;
  var k1;
  var h1b;
  var i = 0;
  while (i < bytes) {
      k1 =
          ((key.charCodeAt(i) & 0xff)) |
              ((key.charCodeAt(++i) & 0xff) << 8) |
              ((key.charCodeAt(++i) & 0xff) << 16) |
              ((key.charCodeAt(++i) & 0xff) << 24);
      ++i;
      k1 = ((((k1 & 0xffff) * c1) + ((((k1 >>> 16) * c1) & 0xffff) << 16))) & 0xffffffff;
      k1 = (k1 << 15) | (k1 >>> 17);
      k1 = ((((k1 & 0xffff) * c2) + ((((k1 >>> 16) * c2) & 0xffff) << 16))) & 0xffffffff;
      h1 ^= k1;
      h1 = (h1 << 13) | (h1 >>> 19);
      h1b = ((((h1 & 0xffff) * 5) + ((((h1 >>> 16) * 5) & 0xffff) << 16))) & 0xffffffff;
      h1 = (((h1b & 0xffff) + 0x6b64) + ((((h1b >>> 16) + 0xe654) & 0xffff) << 16));
  }
  k1 = 0;
  switch (remainder) {
      case 3: k1 ^= (key.charCodeAt(i + 2) & 0xff) << 16;
      case 2: k1 ^= (key.charCodeAt(i + 1) & 0xff) << 8;
      case 1:
          k1 ^= (key.charCodeAt(i) & 0xff);
          k1 = (((k1 & 0xffff) * c1) + ((((k1 >>> 16) * c1) & 0xffff) << 16)) & 0xffffffff;
          k1 = (k1 << 15) | (k1 >>> 17);
          k1 = (((k1 & 0xffff) * c2) + ((((k1 >>> 16) * c2) & 0xffff) << 16)) & 0xffffffff;
          h1 ^= k1;
  }
  h1 ^= key.length;
  h1 ^= h1 >>> 16;
  h1 = (((h1 & 0xffff) * 0x85ebca6b) + ((((h1 >>> 16) * 0x85ebca6b) & 0xffff) << 16)) & 0xffffffff;
  h1 ^= h1 >>> 13;
  h1 = ((((h1 & 0xffff) * 0xc2b2ae35) + ((((h1 >>> 16) * 0xc2b2ae35) & 0xffff) << 16))) & 0xffffffff;
  h1 ^= h1 >>> 16;
  return h1 >>> 0;
}

var TOTAL_BUCKETS = 10000;
function getBucket(saltedId) {
  var hash = murmurhash3_32_gc(saltedId, 0);
  var hashFixedBucket = Math.abs(hash) % TOTAL_BUCKETS;
  var bucket = hashFixedBucket / TOTAL_BUCKETS;
  return bucket;
}
function pickWithWeightsBucket(allocationPercentages, treatments, bucket) {
  var sum = allocationPercentages.reduce(function (partialSum, a) { return partialSum + a; }, 0);
  var partialSum = 0.0;
  for (var i = 0; i < treatments.length; i++) {
      partialSum += Number(allocationPercentages[i].toFixed(2)) / sum;
      if (bucket > partialSum) {
          continue;
      }
      return treatments[i];
  }
}
function assignTreatmentByVisitor(experimentid, identityId, allocationPercentages, treatments) {
  var saltedId = experimentid + '.' + identityId;
  var bucketId = getBucket(saltedId);
  var treatmentId = pickWithWeightsBucket(allocationPercentages, treatments, bucketId);
  return {
      treatmentId: treatmentId,
      bucketId: bucketId
  };
}

var LOCAL_STORAGE_KEY = 'unified-decisioning-experiments';
function assignTreatment(allocationPercentages, treatments) {
  var random = Math.random() * 100;
  var i = treatments.length;
  while (random > 0 && i > 0) {
      i -= 1;
      random -= +allocationPercentages[i];
  }
  return treatments[i];
}
function getLastExperimentTreatment(experimentId) {
  var experimentsStr = storage.getItem(LOCAL_STORAGE_KEY);
  if (experimentsStr) {
      var experiments = JSON.parse(experimentsStr);
      if (experiments[experimentId]) {
          return experiments[experimentId].treatment;
      }
  }
  return null;
}
function setLastExperimentTreatment(experimentId, treatment) {
  var experimentsStr = storage.getItem(LOCAL_STORAGE_KEY);
  var experiments = experimentsStr ? JSON.parse(experimentsStr) : {};
  var now = new Date();
  var expKeys = Object.keys(experiments);
  expKeys.forEach(function (key) {
      var date = new Date(experiments[key].date);
      if ((now.getTime() - date.getTime()) > (1000 * 86400 * 30)) {
          delete experiments[key];
      }
  });
  var date = now.toISOString().split('T')[0];
  experiments[experimentId] = { treatment: treatment, date: date };
  storage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(experiments));
}
function assignTreatmentByDevice(experimentId, allocationPercentages, treatments) {
  var cachedTreatmentId = getLastExperimentTreatment(experimentId);
  var treatmentIdResponse;
  if (!cachedTreatmentId || !treatments.includes(cachedTreatmentId)) {
      var assignedTreatmentId = assignTreatment(allocationPercentages, treatments);
      setLastExperimentTreatment(experimentId, assignedTreatmentId);
      treatmentIdResponse = assignedTreatmentId;
  }
  else {
      treatmentIdResponse = cachedTreatmentId;
  }
  return {
      treatmentId: treatmentIdResponse
  };
}

var RandomizationUnit = {
  VISITOR: 'VISITOR',
  DEVICE: 'DEVICE'
};
function evaluateExperiment(context, experiment) {
  var experimentId = experiment.id, identityNamespace = experiment.identityNamespace, _a = experiment.randomizationUnit, randomizationUnit = _a === void 0 ? RandomizationUnit.VISITOR : _a;
  var identityMap = context.identityMap;
  var treatments = experiment.treatments.map(function (item) { return item.id; });
  var allocationPercentages = experiment.treatments.map(function (item) { return item.allocationPercentage; });
  var treatmentAssignment = null;
  switch (randomizationUnit) {
      case RandomizationUnit.VISITOR: {
          var identityId = identityMap[identityNamespace][0].id;
          treatmentAssignment = assignTreatmentByVisitor(experimentId, identityId, allocationPercentages, treatments);
          break;
      }
      case RandomizationUnit.DEVICE: {
          treatmentAssignment = assignTreatmentByDevice(experimentId, allocationPercentages, treatments);
          break;
      }
      default:
          throw new Error("Unknow randomization unit");
  }
  var evaluationResponse = {
      experimentId: experimentId,
      hashedBucket: treatmentAssignment.bucketId,
      treatment: {
          id: treatmentAssignment.treatmentId
      }
  };
  return evaluationResponse;
}

function traverseDecisionTree(decisionNodesMap, context, currentNodeId) {
  var _a = decisionNodesMap[currentNodeId], experiment = _a.experiment, type = _a.type;
  if (type === 'EXPERIMENTATION') {
      var treatment = evaluateExperiment(context, experiment).treatment;
      return [treatment];
  }
}
function evaluateDecisionPolicy(decisionPolicy, context) {
  if (context.storage && context.storage instanceof Storage) {
    storage = context.storage;
  }
  var decisionNodesMap = {};
  decisionPolicy.decisionNodes.forEach(function (item) {
      decisionNodesMap[item['id']] = item;
  });
  var items = traverseDecisionTree(decisionNodesMap, context, decisionPolicy.rootDecisionNodeId);
  return {
      items: items
  };
}

export const ued = { evaluateDecisionPolicy };
