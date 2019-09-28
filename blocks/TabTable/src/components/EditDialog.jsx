import React, { useState } from 'react';
import { Form, Field } from '@ice/form';
import { Dialog, Button, Input } from '@alifd/next';
import styles from '../index.module.scss';

export default function EditDialog(props) {
  const [visible, setVisible] = useState(false);
  const [dataIndex, setDataIndex] = useState(null);
  const [initialValues, setInitialValues] = useState({});

  let handleSubmit = null;

  const onSubmit = (values) => {
    console.log(values, dataIndex);
    setVisible(false);
    props.getFormValues(dataIndex, values);
  };

  const onOpen = (index, record) => {
    setInitialValues(record);
    setVisible(true);
    setDataIndex(index);
  };

  const onClose = () => {
    setVisible(false);
  };

  const { index, record } = props;

  return (
    <div className={styles.editDialog}>
      <Button type="primary" onClick={() => onOpen(index, record)}>
        编辑
      </Button>
      <Dialog
        className={styles.w}
        visible={visible}
        onOk={e => handleSubmit(e)}
        closeable="esc,mask,close"
        onCancel={onClose}
        onClose={onClose}
        title="编辑"
      >
        <Form
          onSubmit={onSubmit}
          initialValues={initialValues}
          layout={{
            wrapperCol: 10,
          }}
        >
          {(formCore) => {
            handleSubmit = formCore.submit.bind(formCore);
            return (
              <React.Fragment>
                <Field label="标题：" name="title" component={Input} rules={{ required: true, message: '必填选项' }} />
                <Field label="作者：" name="author" component={Input} rules={{ required: true, message: '必填选项' }} />
                <Field label="状态：" name="status" component={Input} rules={{ required: true, message: '必填选项' }} />
                <Field label="发布时间：" name="date" component={Input} rules={{ required: true, message: '必填选项' }} />
              </React.Fragment>
            );
          }}
        </Form>
      </Dialog>
    </div>
  );
}
