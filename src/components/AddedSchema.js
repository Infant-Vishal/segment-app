import React, { useState } from "react";
import { BsDashSquare } from "react-icons/bs";
import { GoPrimitiveDot } from "react-icons/go";

const AddedSchema = ({
  addedSchema,
  newSegmentArr,
  schemaOptions,
  setSchemaOptions,
  setNewSegmentArr,
}) => {
  const [newSchemaOptions, setNewSchemaOptions] = useState([...schemaOptions]);

  if (newSchemaOptions[0].value === "") {
    newSchemaOptions.splice(0, 1);
   
  }

  const handleRemove = (option) => {
    console.log("removed option",option)
    schemaOptions.push(option)
    var index = newSchemaOptions.findIndex(
      (item) => item.value == option.value
    );
    const tempNewSegementArr = [...newSegmentArr];

    tempNewSegementArr.splice(index, 1);
    setNewSegmentArr(tempNewSegementArr);
  };

  console.log("new segemnt array", newSegmentArr);

  return (
    <div className="blue-box">
      <ul className="m-0 p-0">
        {newSegmentArr.map((option) => {
          console.log("main option", option);
          return (
            <li className="d-flex flex-row justify-content-center">
              <GoPrimitiveDot className="mt-4 me-3" color="#46f070" />
              <select className="form-control form-select w-75 mt-3 mb-3 me-3">
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
                {schemaOptions.map((newSchemaOptions) => {
                  return (
                    <option
                      key={newSchemaOptions.value}
                      value={newSchemaOptions.value}
                    >
                      {newSchemaOptions.label}
                    </option>
                  );
                })}
              </select>

              <BsDashSquare
                type="button"
                className="mt-4"
                size={24}
                color="grey"
                onClick={() => handleRemove(option)}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default AddedSchema;
