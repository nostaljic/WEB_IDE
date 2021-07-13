import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom';
import './style.scss'
var moment = require('moment');

function BoardDisplayTable(props) {
    const { boardposts } = props;
    console.log(boardposts);
    return (
        <table className="table table-contribution">
            <thead>
                <tr>
                    <th width = "5%">순번</th>
                    <th width = "5%">문제번호</th>
                    <th width = "40%">제목</th>
                    <th width = "5%">댓글</th>
                    <th width = "15%">작성일</th>
                </tr>
            </thead>
            <tbody>
                {
                    boardposts.map((item,index) => {
                        return (
                            <tr key = {index} onClick={() => props.history.push('/board/view?id=1')}>
                                <th>{item.post_id}</th>
                                <td>{item.problem_num}</td>
                                <td>{item.post_title}</td>
                                <th>{item.comment_num}</th>
                                <th>{moment(item.written_date).format("YYYY-MM-DD")}</th>
                                
                            </tr>
                        )
                    })
                }
            </tbody>     
        </table>
    )
}
export default withRouter(BoardDisplayTable)

