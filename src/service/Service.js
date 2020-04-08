import React, {useState} from 'react';
import {Card, Form, Input, Button, Checkbox, Collapse, Space} from 'antd';
import {PSRLayout} from "../framework/view/PSRLayout";
import 'react-quill/dist/quill.snow.css';
import {ServiceData} from "./model/ServiceData";

const {TextArea} = Input;

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};

const {Panel} = Collapse;

export function Service(props) {
    const [serviceTypeData, update] = useState(ServiceData.newService());

    const updateState = function () {
        update(ServiceData.clone(serviceTypeData));
    };

    return (
        <PSRLayout>
            <Form {...layout} name="basic" onFinish={() => {
            }} onFinishFailed={() => {
            }}>
                <Space direction="vertical" style={{width: "100%"}}>
                    <Collapse defaultActiveKey={['1']}>
                        <Panel header="Service details" key="1">
                            <Form.Item
                                label="Name" name="name"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please provide service name',
                                    },
                                ]}>
                                <Input onChange={(e) => {
                                    serviceTypeData.name = e.target.value;
                                    updateState();
                                }}/>
                            </Form.Item>

                            <Form.Item
                                label="Description"
                                name="description"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please provide service description'
                                    },
                                ]}>
                                    <TextArea onChange={(e) => {
                                        serviceTypeData.description = e.target.value;
                                        updateState();
                                    }} autoSize={{minRows: 2}}/>
                            </Form.Item>

                            <Form.Item label="References" name="references">
                                <TextArea onChange={(e) => {
                                    serviceTypeData.references = e.target.value;
                                    updateState();
                                }} autoSize={{minRows: 2}}/>
                            </Form.Item>
                        </Panel>
                    </Collapse>

                    {serviceTypeData.components.map((serviceComponentData, index) => {
                            let prefix = (index + 2).toString();
                            return <Collapse defaultActiveKey={[prefix]}>
                                <Panel header={`Service Component - ${index + 1}`} key={prefix}>
                                    <Form.Item label="Name" name={`${prefix}.component.name`}
                                        rules={[{
                                                required: true,
                                                message: 'This field is mandatory'}]}>
                                        <Input onChange={(e) => {
                                            serviceComponentData.name = e.target.value;
                                            updateState();
                                        }}/>
                                    </Form.Item>

                                    <Collapse defaultActiveKey={['foo']}>
                                        <Panel header={`Application - ${index + 100}`} key={prefix}>
                                            <Form.Item label="Application name" name={`${prefix}.component.name`}
                                                       rules={[{
                                                           required: true,
                                                           message: 'This field is mandatory'}]}>
                                                <Input onChange={(e) => {
                                                    serviceComponentData.applications[0].name = e.target.value;
                                                    updateState();
                                                }}/>
                                            </Form.Item>

                                            <Form.Item label="Communication medium" name={`${prefix}.component.name`}
                                                       rules={[{
                                                           required: true,
                                                           message: 'This field is mandatory'}]}>
                                                <Input onChange={(e) => {
                                                    serviceComponentData.applications[0].name = e.target.value;
                                                    updateState();
                                                }}/>
                                            </Form.Item>
                                        </Panel>
                                    </Collapse>
                                </Panel>
                            </Collapse>
                        }
                    )};
                    <Button type="secondary" htmlType="submit">Add Service Component</Button>


                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Space>
            </Form>
        </PSRLayout>
    );
}