/**
 *
 * @param {string} targetEvent a string representing the event name.
 * @param {string[]} targetContexts an array of strings representing the contexts which should exist in the acdl
 * @param {[]} adobeDataLayer a copy of the current ACDL under test
 */
export const expectsEventWithContext = (targetEvent, targetContexts, adobeDataLayer = []) => {
  if (targetEvent) {
    const targetEventIndex = adobeDataLayer.findIndex(data => data?.event === targetEvent);
    expect(targetEventIndex, targetEvent).to.be.greaterThan(-1);
  }
  if (targetContexts?.length) {
    targetContexts.forEach((targetContext) => {
      const contextIndex = adobeDataLayer.findIndex(data => !!data[targetContext]);
      expect(contextIndex, targetContext).to.be.greaterThan(-1);
    });
  }
}
