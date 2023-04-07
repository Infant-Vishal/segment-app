import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { RiAddFill } from "react-icons/ri";
import AddedSchema from "./AddedSchema";
import "../assets/styles/segmentModal.css";
import axios from "axios";

const SegmentModal = () => {
  const [showSegmentModal, setShowSegmentModal] = useState(false);
  const [segementName, setSegmentName] = useState("");
  const [newSegmentArr, setNewSegmentArr] = useState([]);
  const [addedSchema, setAddedSchema] = useState({});
  const handleClose = () => setShowSegmentModal(false);
  const handleShow = () => setShowSegmentModal(true);

  const [schemaOptions, setSchemaOptions] = useState([
    {
      label: "Add schema to segment",
      value: "",
    },
    {
      label: "First Name",
      value: "first_name",
    },
    {
      label: "Last Name",
      value: "last_name",
    },
    {
      label: "Gender",
      value: "gender",
    },
    {
      label: "Age",
      value: "age",
    },
    {
      label: " Account Name",
      value: "account_name",
    },
    {
      label: "City",
      value: "city",
    },
    {
      label: "State",
      value: "state",
    },
  ]);

  const handleSelectedSchema = (e) => {
    const selectedOption = e.target.value;
    const selectedItem = schemaOptions.find(
      (item) => item.value == selectedOption
    );
    setAddedSchema(selectedItem);
  };

  const addNewSegment = () => {
    const newSchemaOptions = [...schemaOptions];

    const newArr = [...newSegmentArr, addedSchema];
    setNewSegmentArr(newArr);

    const filteredArr = newSchemaOptions.filter(
      (item) => item.value != addedSchema.value
    );

    setSchemaOptions(filteredArr);
  };

  const handleSave = (e) => {
    e.preventDefault();
    const segment = newSegmentArr.map((item) => {
      return { [item.value]: item.label };
    });

    const finalSavedSegment = {
      ["segment_name"]: segementName,
      segment: segment,
    };

    axios.post("https://webhook.site/", finalSavedSegment).then(res => console.log("response", res));
    setShowSegmentModal(false);
  };
  return (
    <>
      <Button variant="outline-primary" onClick={handleShow}>
        Save Segment
      </Button>

      <Modal size="lg" show={showSegmentModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Saving Segment</Modal.Title>
        </Modal.Header>
        <Modal.Body className="mb-5">
          <h6>Enter the Name of the Segment</h6>
          <input
            type="text"
            className="form-control mt-3 mb-3"
            placeholder="Name of the segment"
            onChange={(e) => setSegmentName(e.target.value)}
          />
          <p>
            To save your segment, you need to add the schemas to build the query
          </p>
          <ul className="d-flex flex-row justify-content-end">
            <li style={{ color: "#46f070" }}>
              <p className="text-dark">- User Traits </p>{" "}
            </li>
            <li style={{ color: "#f74a95", marginLeft: "32px" }}>
              <p className="text-dark">- Group Traits </p>{" "}
            </li>
          </ul>

          <AddedSchema
            addedSchema={addedSchema}
            newSegmentArr={newSegmentArr}
            schemaOptions={schemaOptions}
            setSchemaOptions={setSchemaOptions}
            setNewSegmentArr={setNewSegmentArr}
          />

          <select
            className="form-control form-select mb-4"
            onChange={handleSelectedSchema}
          >
            {schemaOptions?.map((item) => {
              return (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              );
            })}
          </select>
          <a className="add-new-schema-link" onClick={addNewSegment}>
            <RiAddFill color="#2ec754" />
            <span>Add new schema</span>
          </a>
        </Modal.Body>
        <Modal.Footer className="me-auto">
          <Button variant="success" onClick={handleSave}>
            Save Segment
          </Button>
          <Button variant="outline-danger" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SegmentModal;
