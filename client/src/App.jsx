import { useEffect, useState, useRef } from "react";
import axios from "axios";

import "./App.css";
import {
  BoxContainer,
  ArithematicBoxContainer,
  ComparisionBoxContainer,
  OperatorBoxItem,
  VarBoxItem,
  RhsBoxItem,
} from "./components/index";

const varsURL = "http://localhost:5000/api/v1/vars";

const App = () => {
  const [varList, setVarList] = useState([]);
  const [isDataLoading, setDataLoading] = useState(false);
  const [evalList, setEvalList] = useState([]);

  const getVarsData = async () => {
    try {
      const response = await axios.get(varsURL);
      return response.data.varList;
    } catch (error) {
      console.log(error);
    }
  };

  const fetchVarData = async () => {
    setDataLoading(true);

    await getVarsData().then((fetchedVarsData) => {
      setVarList(fetchedVarsData);
      setDataLoading(false);
    });
  };

  useEffect(() => {
    fetchVarData();
  }, []);

  const boxItem = useRef();

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
  };

  const evalExpression = () => {
    const copyEvalListItems = [...evalList];
    let finalRes = null;
    let expression = "";

    for (const element of copyEvalListItems) {
      expression += element.value;
    }

    finalRes = eval(expression);

    alert(finalRes);
  };

  return (
    <div className="App">
      {isDataLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <BoxContainer>
            {varList &&
              varList.map((item, index) => (
                <VarBoxItem
                  draggable
                  item={item}
                  key={index}
                  index={index}
                  dragStart={dragStart}
                />
              ))}
          </BoxContainer>
          <BoxContainer>
            <ArithematicBoxContainer>
              {arithOpList &&
                arithOpList.map((item, index) => (
                  <OperatorBoxItem
                    draggable
                    item={item}
                    key={index}
                    index={index}
                    dragStart={dragStart}
                  />
                ))}
            </ArithematicBoxContainer>
            <ComparisionBoxContainer>
              {compOpList &&
                compOpList.map((item, index) => (
                  <div
                    className="box-item style-ops"
                    onDoubleClick={() => addToEvalCont(index)}
                    key={index}
                    index={index}
                  >
                    <span className="box-value">{item.value}</span>
                  </div>
                ))}
            </ComparisionBoxContainer>
            <div className="rhs-int-val">
              <div className="box-item style-ops">
                <button className="btn box-value" onClick={() => getRhsVal()}>
                  RHS Integer
                </button>
              </div>
            </div>
          </BoxContainer>

          <BoxContainer>
            <div
              className="style-eval"
              onDrop={drop}
              onDragOver={(e) => {
                allowDrop(e);
              }}
            >
              {evalList &&
                evalList.map((item, index) => {
                  if (item.type === "var") {
                    return (
                      <VarBoxItem
                        item={item}
                        key={index}
                        index={index}
                        removeBoxItem={removeBoxItem}
                      />
                    );
                  } else if (
                    item.type === "arithOp" ||
                    item.type === "compOp"
                  ) {
                    return (
                      <OperatorBoxItem
                        item={item}
                        key={index}
                        index={index}
                        removeBoxItem={removeBoxItem}
                      />
                    );
                  } else if (item.type === "rhs") {
                    return (
                      <RhsBoxItem
                        item={item}
                        key={index}
                        index={index}
                        removeBoxItem={removeBoxItem}
                      />
                    );
                  } else {
                    return null;
                  }
                })}
            </div>
          </BoxContainer>

          <div className="btn-cont">
            <button className="eval-btn" onClick={() => evalExpression()}>
              Evaluate
            </button>
          </div>
          <BoxContainer>
          {varList &&
            varList.map((item, index) => (
              <p className="list-vars" key={index}>
                {item.name} = {item.value}
              </p>
            ))}
          </BoxContainer>
        </>
      )}
    </div>
  );
};

export default App;
