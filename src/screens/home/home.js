import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { listWorkspaces } from "../../components/actions/workspaceActions";
import {
  Layout,
  Button,
  Form,
  Input,
  // Select,
  Typography,
  Row,
  Col,
} from "antd";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar";

const { Content } = Layout;
const { Title } = Typography;
// const { Option } = Select;

export default function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const [criteria, setCriteria] = useState("project_name");
  const [search, setSearch] = useState({
    project_name: "",
    location: "",
    clieant_name: "",
  });

  const handleClick = () => {
    // dispatch(listWorkspaces(criteria, search, navigate));
    navigate('/project-details')
  };

  // const handleDropdownChange = (value) => {
  //   setCriteria(value);
  // };

  const handleSearch = (e) => {
    setSearch({ ...search, [e.target.name]: e.target.value });
  };

  return (
    <Layout>
      <Navbar />
      <Content>
        <Row className="h-dvh flex flex-col">
          <Row span={32} className=" flex flex-row justify-center items-center">
            <Col span={16}>
              <Title level={3} className="text-center mt-60">
                Search for your Project budget with either Project Name,
                Location and Client Name
              </Title>
              <Form layout="vertical" onFinish={handleClick}>
                <Row gutter={32} className="mt-20">
                  {/* <Col span={8}>
                    <Form.Item label="Select Option">
                      <Select value={criteria} onChange={handleDropdownChange}>
                        <Option value="project_name">Project Name</Option>
                        <Option value="location">Location</Option>
                        <Option value="client_name">Client Name</Option>
                      </Select>
                    </Form.Item>
                  </Col> */}
                  <Col span={8}>
                    <Form.Item label="Project name">
                      <Input
                        placeholder="Enter Project name"
                        value={search.project_name}
                        name="project_name"
                        onChange={handleSearch}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="Location">
                      <Input
                        placeholder="Enter location"
                        value={search.location}
                        name="location"
                        onChange={handleSearch}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="Client name">
                      <Input
                        placeholder="Enter Client name"
                        value={search.clieant_name}
                        name="clieant_name"
                        onChange={handleSearch}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row justify="center">
                  <Button
                    type="primary"
                    htmlType="submit"
                    disabled={
                      search.project_name === "" ||
                      search.clieant_name === "" ||
                      search.location === ""
                      // criteria === ""
                    }
                  >
                    Submit
                  </Button>
                </Row>
              </Form>
            </Col>
          </Row>
        </Row>
      </Content>
    </Layout>
  );
}
