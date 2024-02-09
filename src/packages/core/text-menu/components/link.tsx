import React from "react";
import { Popover, Form, Input, Switch, Button as AntButton } from "antd";

import { Button } from "./button";
import { TextMenuContext } from "..";

export const Link: React.FC = () => {
  const { editor } = React.useContext(TextMenuContext);

  const [form] = Form.useForm();
  const [submittable, setSubmittable] = React.useState(false);

  const values = Form.useWatch([], form);

  React.useEffect(() => {
    if (/^(\S+):(\/\/)?\S+$/.test(values?.url ?? "")) {
      setSubmittable(true);
    } else {
      setSubmittable(false);
    }
  }, [values]);

  if (!editor) return;

  const onUnsetLink = () => {
    if (editor.isActive("link")) {
      return editor.chain().focus().unsetLink().run();
    }
  };

  const onSetLink = ({ url, inNewTab }: { url: string; inNewTab: boolean }) => {
    if (/^(\S+):(\/\/)?\S+$/.test(url)) {
      form.resetFields();
      editor
        .chain()
        .focus()
        .setLink({ href: url, target: inNewTab ? "_blank" : "" })
        .run();
    }
  };

  if (editor.isActive("link")) {
    return <Button active icon="Unlink" tip="Unlink" onClick={onUnsetLink} />;
  }

  return (
    <Popover
      trigger="click"
      content={
        <Form form={form} size="small" colon={false} onFinish={onSetLink} autoComplete="off">
          <Form.Item noStyle name="url" initialValue="">
            <Input placeholder="Enter URL" />
          </Form.Item>

          <Form.Item name="inNewTab" valuePropName="checked" label="Open in new tab" className="my-3">
            <Switch />
          </Form.Item>

          <Form.Item noStyle>
            <AntButton type="primary" htmlType="submit" block disabled={!submittable}>
              Set link
            </AntButton>
          </Form.Item>
        </Form>
      }
    >
      <Button icon="Link" tip="Set link" />
    </Popover>
  );
};
