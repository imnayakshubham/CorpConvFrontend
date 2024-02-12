import { Dispatch, useEffect } from "react"
import { PostModalDataType } from "../Posts"
import "./CreatePost.css"
import { Form, Input, Modal, Tabs } from "antd"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useDispatch, useSelector } from "react-redux";
import { addPostRequest, editPostRequest } from "../../../../store/action/posts";
import { AsyncStates } from "../../../../constants";
import { Button } from "@/components/ui/button"


type CreatePostModalPropsType = {
    setPostModalData: Dispatch<React.SetStateAction<PostModalDataType>>,
    postModalData: PostModalDataType

}

export const categoriesList = {
    company_review: "Company Review",
    random: "Random",
    reading: "Reading",
    learning: "Learning",
    thoughts: "Thoughts",
    project: "Project",
    Watching: "Watching",
}

export const CreatePost = ({ setPostModalData, postModalData }: CreatePostModalPropsType) => {
    const [postForm] = Form.useForm()
    const dispatch = useDispatch()
    const addPostStatus = useSelector((state) => state.posts.addPostStatus)
    const editPostStatus = useSelector((state) => state.posts.editPostStatus)

    const handleCreatePost = () => {
        setPostModalData({
            showModel: true,
            data: null,
            mode: "create"
        })
    }

    useEffect(() => {
        if (postModalData.data && postModalData.mode === "edit") {
            postForm.setFieldsValue({
                category: postModalData.data.category,
                content: postModalData.data.content,
            })
        }
    }, [postModalData.data, postForm, postModalData.mode])

    useEffect(() => {
        if (editPostStatus === AsyncStates.SUCCESS || addPostStatus === AsyncStates.SUCCESS) {
            setPostModalData({
                showModel: false,
                data: null,
                mode: "create"
            })
            postForm.resetFields()
        }
    }, [editPostStatus, setPostModalData, addPostStatus])

    const handlePost = (values: any) => {
        if (postModalData.mode === "edit") {
            dispatch(editPostRequest({ _id: postModalData.data._id, ...values }))
        } else {
            dispatch(addPostRequest(values))

        }
    }

    return (
        <div>
            <div className="create__post__container">
                <Button
                    variant={"outline"}
                    onClick={() => {
                        handleCreatePost()
                    }}
                >{"Add"} Post</Button>
            </div>
            <Modal
                title={`${postModalData.mode === "create" ? "Add" : "Update"} Post`}
                style={{ bottom: 0 }}
                open={postModalData.showModel}
                footer={null}
                maskClosable={false}
                centered
                onCancel={() => {
                    setPostModalData({
                        showModel: false,
                        data: null,
                        mode: "create"
                    })
                    postForm.resetFields()
                }}
            >
                <Form layout='vertical' onFinish={handlePost}
                    form={postForm}
                    initialValues={{
                        category: "company_review",
                        content: null
                    }}>
                    <Form.Item
                        label=""
                        name={"category"}
                    >
                        <Tabs
                            destroyInactiveTabPane={true}
                            activeKey={postModalData.data?.category ?? postForm.getFieldValue("category") ?? "company_review"}
                            defaultActiveKey={postModalData.data?.category ?? postForm.getFieldValue("category") ?? "company_review"}
                            onChange={(activeKey) => {
                                postForm.setFieldsValue({ category: activeKey, content: null })
                            }}
                            items={Object.keys(categoriesList).map((categoryKey) => {
                                return {
                                    key: categoryKey,
                                    value: categoryKey,
                                    label: categoriesList[categoryKey],
                                    children: <Form.Item
                                        label=""
                                        name={"content"}
                                        rules={[{ required: true, message: 'Please input Content!', min: 5 }]}
                                    >
                                        <ReactQuill theme="snow"
                                            onChange={(value) => {
                                                if (value === "<p><br></p>") {
                                                    postForm.setFieldValue("content", null)
                                                }
                                            }}
                                            value={postForm.getFieldValue("content")}
                                        />
                                    </Form.Item>
                                };
                            })}
                        />
                    </Form.Item>
                    <Form.Item style={{ display: "flex", justifyContent: "flex-end" }}>
                        <Button>{postModalData.mode === "create" ? "Add" : "Update"} Post</Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}
