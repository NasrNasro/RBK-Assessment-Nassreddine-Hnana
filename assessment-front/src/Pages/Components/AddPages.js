import React, { useState } from "react";
import { Button, Col, Container, Row, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addPage } from "../../redux/actions/pagesActions";

function AddPages() {
  const dispatch = useDispatch();
  // product inputs
  const [info, setInfo] = useState({ title: "", content: "" });
  const [selectedImages, setSelectedImages] = useState([]);
  // handle change
  const handleChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };
  // add images
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setSelectedImages(selectedFiles);
  };
  // handle add product
  const handleAdd = (e) => {
    e.preventDefault();
    dispatch(addPage(info, selectedImages));
  };
  return (
    <div>
      <div>
        <Container className="mt-5">
          <h2 className="shadow-sm p-3 m-5 text-center">Add new Page</h2>
          <Row>
            <Col
              lg={5}
              md={6}
              sm={12}
              className="p-5 m-auto shadow-sm rounded-lg"
            >
              <Form>
                <Form.Group className="mb-3" controlId="formBasicText">
                  <Form.Label>Page Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter page name"
                    name="title"
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicText">
                  <Form.Label>Page Content</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter page content"
                    name="content"
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group controlId="formFile" className="mb-3">
                  <Form.Label>Images</Form.Label>
                  <Form.Control
                    type="file"
                    multiple
                    onChange={handleFileChange}
                  />
                </Form.Group>
                <Button variant="primary w-100 mb-3" onClick={handleAdd}>
                  Add Page
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default AddPages;
