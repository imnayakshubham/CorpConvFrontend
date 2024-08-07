import { useEffect, useState } from 'react'
import { CreatePost } from './CreatePost/CreatePost'
import "./Posts.css"
import { useDispatch, useSelector } from 'react-redux'
import { addPostSuccess, fetchPostsRequest, upvotePostSuccess } from '../../../store/action/posts'
import { PostList } from './PostList/PostList'
import { AsyncStates } from '../../../constants'


export const Posts = ({ from, user_id = null }) => {
    const socket = useSelector((state) => state.common.socketInstance)
    const posts = useSelector((state) => state.posts.postsList)
    const fetchPostsStatus = useSelector((state) => state.posts.fetchPostsStatus)

    const [postModalData, setPostModalData] = useState({
        showModel: false,
        data: null,
        mode: "create"
    })

    const userInfo = useSelector((state) => state.login.loginResponse)
    const dispatch = useDispatch()

    useEffect(() => {
        if (!socket) return
        socket.on("listen_post_creation", (postData) => {
            if (userInfo?._id !== postData.post_posted_by._id) {
                dispatch(addPostSuccess(postData))
            }
        })
        // socket.on("listen_job_edition", (jobData) => {
        //     if (userInfo?._id !== jobData.job_posted_by._id) {
        //         dispatch(editJobSuccess(jobData))
        //     }
        // })
        socket.on("listen_upvote", (postData) => {
            if (userInfo?._id !== postData.upvoted_by) {
                if (postData.data) {
                    dispatch(upvotePostSuccess(postData.data))
                }
            }
        })
        // socket.on("listen_job_bookmark", (jobData) => {
        //     if (userInfo?._id !== jobData.job_posted_by._id) {
        //         dispatch(createBookmarkSuccess(jobData))
        //     }
        // })
    }, [dispatch, socket, userInfo?._id])

    useEffect(() => {
        if (from === "user_profile") {
            if (user_id) {
                dispatch(fetchPostsRequest({ _id: user_id }))
            }
        } else {
            dispatch(fetchPostsRequest())

        }
    }, [dispatch, from, user_id])

    return (
        <div>
            {from === "user_profile" && !!posts.length &&
                <h1 className='font-semibold p-2 text-xl'>Posts</h1>
            }

            {userInfo &&
                <CreatePost postModalData={postModalData} setPostModalData={setPostModalData} />
            }

            {
                (posts.length === 0 && fetchPostsStatus === AsyncStates.SUCCESS) &&
                <div className="flex justify-center items-center">
                    <h1 className="text-2xl font-semibold">No posts Found</h1>
                </div>
            }
            <PostList setPostModalData={setPostModalData} />
        </div>
    )
}
