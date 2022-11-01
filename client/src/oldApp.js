const varList = [
  {
    name: "A",
    value: "7",
    type: "var",
  },
  {
    name: "B",
    value: "12",
    type: "var",
  },
  {
    name: "C",
    value: "5",
    type: "var",
  },
  {
    name: "D",
    value: "3",
    type: "var",
  },
  {
    name: "E",
    value: "0",
    type: "var",
  },
];

const arithOpList = [
  {
    name: "add",
    value: "+",
    type: "arithOp",
  },
  {
    name: "sub",
    value: "-",
    type: "arithOp",
  },
  {
    name: "multiply",
    value: "*",
    type: "arithOp",
  },
  {
    name: "divide",
    value: "/",
    type: "arithOp",
  },
];

const compOpList = [
  {
    name: "lt",
    value: "<",
    type: "compOp",
  },
  {
    name: "gt",
    value: ">",
    type: "compOp",
  },
];
const [evalList, setEvalList] = useState([]);

const boxItem = useRef();

let itemDragType = null;
let rhsVal = null;

const dragStart = (e, idx) => {
  boxItem.current = idx;

  const id = e.target.id;
  itemDragType = id;
};

const removeBoxItem = (idx) => {
  const copyEvalListItems = [...evalList];

  copyEvalListItems.splice(idx, 1);
  setEvalList(copyEvalListItems);
};

const allowDrop = (e) => {
  e.preventDefault();
};

const addToEvalCont = (idx) => {
  const copyEvalListItems = [...evalList];

  boxItem.current = idx;

  const compOpListItem = compOpList[boxItem.current];

  copyEvalListItems.push(compOpListItem);
  setEvalList(copyEvalListItems);
};

const getRhsVal = () => {
  rhsVal = prompt("What should be the rhs value?");

  rhsVal = {
    name: "rhsVal",
    type: "rhs",
    value: rhsVal,
  };

  const copyEvalListItems = [...evalList];

  copyEvalListItems.push(rhsVal);
  setEvalList(copyEvalListItems);
};

const drop = () => {
  const copyEvalListItems = [...evalList];
  const copyVarListItems = [...varList];
  const copyArithOpListItems = [...arithOpList];
  let dragItemContent = {};

  if (itemDragType === "var") {
    dragItemContent = copyVarListItems[boxItem.current];
  }

  if (itemDragType === "arithOp") {
    dragItemContent = copyArithOpListItems[boxItem.current];
  }

  copyEvalListItems.push(dragItemContent);

  setEvalList(copyEvalListItems);

  boxItem.current = null;

  // validateExpressionInput();
};

const validateExpressionInput = () => {
  const copyEvalListItems = [...evalList];

  console.log(copyEvalListItems);

  if (copyEvalListItems[0].type !== "var")
    alert("Please enter an operand first!");
  if (copyEvalListItems[1].type === "var") alert("Please enter an operator");
};
const evalExpression = () => {
  const copyEvalListItems = [...evalList];

  const lhs = [];
  let lhsRes = null;
  let finalRes = null;

  // get index of rhs integer value, assuming there's only one in eval list
  const rhsIntValIdx = copyEvalListItems.findIndex(
    (item) => item.type === "rhs"
  );

  // get index of comparision operator, assuming there's only one in eval list
  const compOpIdx = copyEvalListItems.findIndex(
    (item) => item.type === "compOp"
  );

  let expression = "";

  for (const element of copyEvalListItems) {
    expression += element.value;
  }

  console.log("exp = " + expression);

  finalRes = eval(expression);

  // everthing to the left side of comparision operator are operand(s) & operator(s)
  // so we loop through list to upto to the index of comparision operator in the eval list

  // for (let i = 0; i < compOpIdx; i++) {
  //   lhs.push(copyEvalListItems[i].value);
  // }
  // for (let i = 0; i < lhs.length; i++) {
  //   if (lhs.length < 3) {
  //     if (lhs.length == 1) {
  //     } else {
  //       alert("Error! LHS can only have a single operand.");
  //     }
  //   } else {
  //     lhsRes = reorderLHSexp(lhs)
  //     finalRes = evaluateExp(lhsRes, copyEvalListItems[compOpIdx], copyEvalListItems[rhsIntValIdx]);
  //   }
  // }

  alert(finalRes);
};

const reorderLHSexp = (expArr) => {
  let res = "";

  for (let i = 0; i < expArr.length; i++) {
    if (expArr[i] == "/") {
      res = evaluateLHS(expArr[i - 1], expArr[i + 1], expArr[i]);
      expArr.splice(expArr[i], expArr[i + 2], res);
    }

    if (expArr[i] == "*") {
      res = evaluateLHS(expArr[i - 1], expArr[i + 1], expArr[i]);
      expArr.splice(expArr[i], expArr[i + 2], res);
    }

    if (expArr[i] == "/") {
      res = evaluateLHS(expArr[i - 1], expArr[i + 1], expArr[i]);
      expArr.splice(expArr[i], expArr[i + 2], res);
    }
    if (expArr[i] == "/") {
      res = evaluateLHS(expArr[i - 1], expArr[i + 1], expArr[i]);
      expArr.splice(expArr[i], expArr[i + 2], res);
    }
  }
};

const evaluateLHS = (operand1, operand2, operator) => {
  switch (operator) {
    case "+":
      return operand1 + operand2;
    case "-":
      return operand1 - operand2;
    case "*":
      return operand1 + operand2;
    case "/":
      return operand1 / operand2;
    default:
      return null;
  }
};

const evaluateExp = (lhsRes, compOp, rhsVal) => {
  switch (compOp) {
    case ">":
      return lhsRes > rhsVal;
    case "<":
      return lhsRes < rhsVal;
    default:
      return null;
  }
};
