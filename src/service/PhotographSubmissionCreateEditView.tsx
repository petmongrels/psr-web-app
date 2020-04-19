import {Card, Col, Form, InputNumber} from 'antd';
import React, {FunctionComponent} from 'react';
import {EntityRelationshipType, PhotographSubmission, PhotographType} from "./model/Service";
import {ReferenceEntityFormItem} from "../master-data/ReferenceEntityFormItem";
import {BooleanFormItem} from "../framework/view/BooleanFormItem";

type PhotographSubmissionCreateEditViewProps = {
    photographTypes: Array<PhotographType>,
    namePrefix: string,
    entityRelationshipTypes: Array<EntityRelationshipType>,
    photographSubmission: PhotographSubmission,
    onStateChange: Function
};

export const PhotographSubmissionCreateEditView: FunctionComponent<PhotographSubmissionCreateEditViewProps> = ({children, namePrefix, photographTypes, entityRelationshipTypes, photographSubmission, onStateChange}) => {
    return <Card>
        <Col key={`${namePrefix}photographType`}>
            <ReferenceEntityFormItem referenceEntities={photographTypes}
                                     onReferenceEntityChange={(referenceEntity) => {
                                         photographSubmission.photographType = referenceEntity;
                                         onStateChange();
                                     }} formItemName={`${namePrefix}photographType`}
                                     label="Photograph type"/>
        </Col>
        <Col key={`${namePrefix}crossSignRequired`}>
            <BooleanFormItem label="Cross sign required?" formItemName={`${namePrefix}crossSignRequired`} value={photographSubmission.crossSignRequired}
                             onValueChange={(value) => {
                                 photographSubmission.crossSignRequired = value;
                                 onStateChange();
                             }
                             }/>
        </Col>
        <Col key={`${namePrefix}numberOfCopies`}>
            <Form.Item label="Number of copies" name={`${namePrefix}numberOfCopies`}>
                <InputNumber onChange={(value) => {
                    photographSubmission.numberOfCopies = value;
                    onStateChange();
                }}/>
            </Form.Item>
        </Col>
        <Col key={`${namePrefix}relationship`}>
            <ReferenceEntityFormItem referenceEntities={entityRelationshipTypes}
                                     onReferenceEntityChange={(referenceEntity) => {
                                         photographSubmission.entityRelationshipType = referenceEntity;
                                         onStateChange();
                                     }}
                                     formItemName={`${namePrefix}relationship`}
                                     label="Relationship"/>
        </Col>
    </Card>;
};