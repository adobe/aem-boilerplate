const cellNameRegex = /^\$?[A-Z]+\$?(\d+)$/;

function visitor(nameMap, fields, bExcelFormula) {
  return function visit(n) {
    if (n.type === 'Field') {
      const name = n?.name;
      let field;
      if (bExcelFormula) {
        const match = cellNameRegex.exec(name);
        if (match?.[1]) {
          field = nameMap[match[1]];
        }
        if (!field) {
          // eslint-disable-next-line no-console
          console.log(`Unknown column used in excel formula ${n.name}`);
        } else {
          n.name = field.name;
          fields.add(field.id);
        }
      } else {
        fields.add(name);
      }
    } if (n.type === 'Function') {
      n.name = n.name.toLowerCase();
    } else if (n.type === 'Subexpression') {
      return visit({
        type: 'Field',
        name: n.children[1].name,
      }, n.children[0].name);
    }
    return {
      ...n,
      children: n.children?.map((c) => visit(c)),
    };
  };
}

function updateCellNames(ast, rowNumberFieldMap, bExcelFormula = true) {
  const fields = new Set();
  const newAst = visitor(rowNumberFieldMap, fields, bExcelFormula)(ast);
  return [newAst, Array.from(fields)];
}

export default function transformRule({ prop, expression }, fieldToCellMap, formula) {
  const biSExcelFormula = expression.startsWith('=');
  const updatedExpression = biSExcelFormula ? expression.slice(1) : expression;
  const ast = formula.compile(updatedExpression);
  const [newAst, deps] = updateCellNames(ast, fieldToCellMap, biSExcelFormula);
  return {
    prop,
    deps,
    ast: newAst,
  };
}
