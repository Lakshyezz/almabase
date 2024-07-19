import { useEffect, useRef, useState } from "react";
import "./App.scss";

import { Button } from "primereact/button";
import EditLabelModal from "./components/EditLabelModal/editLabelModal.jsx";

function App() {
  const [openModal, setOpenModal] = useState(false);
  const [widgetList, setWidgetList] = useState([]);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [currentWidget, setCurrentWidget] = useState({});

  const labelRef = useRef();
  const handleOnDragOver = (e) => {
    e.preventDefault();
  };

  const handleOnDrop = (e) => {
    const type = e.dataTransfer.getData("type");

    // watever value that e has according to type return a component with x,y coordinates
    //  as position : fixed, left: x, right: y and place it there .

    const xCoord = e.clientX;
    const yCoord = e.clientY;
    const item = {
      id: 0,
      type: type,
      x: xCoord,
      y: yCoord,
      fontSize: 12,
      text: "",
    };

    setCurrentWidget(item);
    setOpenModal(!openModal);
    setPosition({x: item.x, y: item.y});
    setWidgetList([...widgetList, item]);

    // if(type == 'label') ';'
    // if(type == 'input') '';
    // if(type == 'button') '';
    
  };

  const handleOnDrag = (e, type) => {
    e.dataTransfer.setData("type", type);
  };


  const handleMouseDown = (e) => {
    // Calculate the initial position relative to the container
    const rect = e.target.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;

    // Update the position state
    setPosition({ x: offsetX, y: offsetY });
    console.log(position);

    // Attach event listeners for mousemove and mouseup 
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };
  useEffect(()=>{}, [position])

  const handleMouseMove = (e) => {
    // Update the position based on mouse movement
    setPosition({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });

    // set
  };
  const handleMouseUp = () => {
    // Remove event listeners when the mouse is released
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  return (
    <>
      {/* <InputText value={value} onChange={(e) => setValue(e.target.value)}/> */}
      <div className="wrapper">
        <div
          className="canvas"
          onDrop={(e) => handleOnDrop(e)}
          onDragOver={handleOnDragOver}
        >
          {/*  try to see why this is not working .map  DONE
             and then you can just render list items and every item will have differenct css written here only
             and ondrag will be present to every single element as well */}

          {widgetList?.map(
            (item, indx) =>
              (item.type == "label" && (
                <h2
                  key={indx}
                  style={{
                    position: "fixed",
                    color:'black',
                    fontSize: item.fontSize,
                    top: position.y,
                    left: position.x,
                    // left: item.x,
                    // top: item.y,
                    cursor: 'grab'
                  }}
                  ref={labelRef}
                  // draggable={true}
                  className="label-text-canvas" 
                  onMouseDown={handleMouseDown}
                >
                  'item.text'
                </h2>
              )) ||
              (item.type == "input" && (
                <input
                onMouseDown={handleMouseDown}
                  style={{
                    position: "fixed",
                    left: item.x,
                    top: item.y,
                    height: 40,
                    backgroundColor: "white",
                    width: 200,
                    borderRadius: 4,
                    border: "1px solid rgba(45, 45, 45, 1)",
                  }}
                  type="text"
                />
              )) ||
              (item.type == "button" && (
                <Button
                onMouseDown={handleMouseDown}
                  type="text"
                  style={{
                    left: item.x,
                    top: item.y,
                    backgroundColor: "rgba(45, 45, 45, 1)",
                    color: "white",
                    position: "fixed",
                  }}
                >
                  {" "}
                  'item.text'
                </Button>
              ))
          )}
        </div>
        <div className="menu">
          <h2>BLOCKS</h2>
          <Button
            ref={labelRef}
            draggable={true}
            onDragStart={(e) => handleOnDrag(e, "label")}
            className="drag-btn"
            size="15px"
            label="Label"
            iconPos="left"
            icon={drag_icon_svg}
          />
          <Button
            draggable={true}
            onDragStart={(e) => handleOnDrag(e, "input")}
            className="drag-btn"
            size="15px"
            label="Input"
            iconPos="left"
            icon={drag_icon_svg}
          />
          <Button
            draggable={true}
            onDragStart={(e) => handleOnDrag(e, "button")}
            className="drag-btn"
            size="15px"
            label="Button"
            iconPos="left"
            icon={drag_icon_svg}
          />
        </div>
        {openModal && (
          <div className="overlay">
            <EditLabelModal
              type={currentWidget.type}
              x={currentWidget.x}
              y={currentWidget.y}
              // text = {}
              setOpenModal={setOpenModal}
              openModal={openModal}
            />
          </div>
        )}
      </div>
    </>
  );
}

export default App;

const drag_icon_svg = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={24}
    height={24}
    color={"#9b9b9b"}
    fill={"none"}
  >
    <path
      d="M8 6H8.00635M8 12H8.00635M8 18H8.00635M15.9937 6H16M15.9937 12H16M15.9937 18H16"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
