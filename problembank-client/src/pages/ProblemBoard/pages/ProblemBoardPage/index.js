import React, { useState } from 'react'
import PropTypes from 'prop-types'
import './style.scss'
import { getBoardData } from '../../../../_actions/boardAction'
import { useDispatch, useSelector } from 'react-redux';
import { FaBorderNone, FaEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import BoardDisplayTable from '../../components/BoardDisplayTable';
import Loading from '../../../../components/Loading/Loading';
import WrapperLoading from '../../../../components/WrapperLoading';
import ProblemBoardLayout from '../../../../layouts/ProblemBoardLayout';
import Select from 'react-select'

function ProblemBoardPage(props) {

    const [[boardposts], setBoard ] = useState([]);

    const [keyword, setKeyword] = useState("");
    const [resultBoard, setResultBoard] = useState([]);

    const [countDisplayPost, setCountDisplayPost] = useState(15);
    const dispatch = useDispatch();
    
    const [loading, setLoading] = useState(false)

    // 컴포넌트가 렌더링 될 때마다 특정 작업 실행용 HOOK
    React.useEffect(() => {
        dispatch(getBoardData()).then(response => {
            console.log(response.payload);
            const { data } = response.payload;
            setBoard([data])
            const slicePosts = data.slice(0, Number(countDisplayPost))
            setResultBoard(slicePosts)
        })
    }, [])


    const handleChange = (e) => {
        setLoading(true)
        let searchValue = e.target.value;
        const filterPosts = boardposts.filter(element => element.post_id === Number(searchValue) || element.post_title.match(new RegExp(searchValue, "i")))
        console.log(filterPosts)
        setKeyword(searchValue);    
        setResultBoard(filterPosts)

        setInterval(function(){ 
            setLoading(false)
        }, 500);
        
    }

    const handleChangeDisplayPro = (e) => {
        setLoading(true)
        const countValue = e.target.value;
        setCountDisplayPost(countValue);

        const slicePosts = boardposts.slice(0, Number(countValue))
        setResultBoard(slicePosts);

        setInterval(function(){ 
            setLoading(false)
        }, 500);
    }

    // //난이도에 따른 검색반경 변경 부분 추후 삭제예정
    // const setDisplayListPost = (e) =>{
    //     const defaultPosts = [...boardposts];
    //     if(e === "모두"){
    //         setResultBoard(defaultPosts)
    //         return;
    //     }
    //     const filterPosts = defaultPosts.filter(element => element.level === e);
    //     setResultBoard(filterPosts)
    // }

    const blockSearch = keyword ? {display: "block"} : {display: "none"};
    const blockFotter = keyword && resultBoard.length === 0 ? {display: "none"} : {display: "block"};

    const [diffculty, setDiffculty ] = useState(false);

    return (
        <ProblemBoardLayout>
            <div className="problemboard_page">
                <div className="container">
                    <div className="wrapper__search">
                        <div className="wrapper__search-key">
                            <input type="text" value={keyword} className="wrapper__search--text" onChange={handleChange} placeholder="이름, 번호를 입력하여 검색하세요."/>
                            <p style = {blockSearch}>{keyword}
                            &nbsp;<span style={{cursor: "pointer"}} onClick={() => setKeyword("")}>x</span>
                            </p>
                        </div>
                        {/* <div className="wrapper__search--filter">
                            <div className="filter-title diffculty__container" onClick={() => setDiffculty(!diffculty)}>
                                난이도 
                                <i class="fa fa-caret-down"></i>
                                {
                                    diffculty ? 
                                        <div className="diffculty__container--select">
                                            <p onClick={() => setDisplayListPost("하")}>하</p>
                                            <p onClick={() => setDisplayListPost("중")}>중</p>
                                            <p onClick={() => setDisplayListPost("상")}>상</p>
                                            <p onClick={() => setDisplayListPost("모두")}>모두</p>
                                        </div> :
                                    ""
                                }
                            </div>
                        </div> */}
                    </div>
                    <div className="wrapper__problems">
                        {
                            loading ? 
                            <WrapperLoading type={'bars'} color={'black'} />
                            :
                                keyword ? 
                                    (resultBoard && resultBoard.length != 0) ?
                                        <BoardDisplayTable boardposts = {resultBoard}/> 
                                    :
                                    <div style={{fontSize: '20px', textAlign: 'center', margin: '50px 0'}}>
                                        <p>검색 결과가 없습니다.</p>
                                    </div>
                                        
                                :
                                (resultBoard && resultBoard.length != 0) ?
                                        <BoardDisplayTable boardposts = {resultBoard} /> 

                                    :
                                    (boardposts&&boardposts.length != 0) ?
                                            <BoardDisplayTable boardposts = {boardposts} />  :
                                        <WrapperLoading type={"bars"} color={"black"} />

                        }
                        <div className="row-selector" style={blockFotter}>
                            <select class="form-control" onChange={handleChangeDisplayPro} value={countDisplayPost}>
                                <option value="15">15</option>
                                <option value="30" selected="">30</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                            </select>
                            <span className="sort-caret">
                                게시글 수
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </ProblemBoardLayout>
    )
}

export default ProblemBoardPage

// import React, { useState } from 'react'
// import PropTypes from 'prop-types'
// import './style.scss'
// import { getBoardData } from '../../../../_actions/boardAction'
// import { useDispatch, useSelector } from 'react-redux';
// import { FaBorderNone, FaEdit } from 'react-icons/fa';
// import { Link } from 'react-router-dom';
// import BoardDisplayTable from '../../components/BoardDisplayTable';
// import Loading from '../../../../components/Loading/Loading';
// import WrapperLoading from '../../../../components/WrapperLoading';
// import ProblemBoardLayout from '../../../../layouts/ProblemBoardLayout';
// import Select from 'react-select'

// function ProblemBoardPage(props) {

//     const [problems, setProblems ] = useState([]);

//     const [keyword, setKeyword] = useState("");
//     const [resultProblem, setResultProblem] = useState([]);

//     const [countDisplayProblem, setCountDisplayProblem] = useState(15);
//     const dispatch = useDispatch();
    
//     const [loading, setLoading] = useState(false)

//     // 컴포넌트가 렌더링 될 때마다 특정 작업 실행용 HOOK
//     React.useEffect(() => {
//         dispatch(getBoardData()).then(response => {
//             const { data } = response.payload;
//             setProblems(data)
//             const sliceProblems = data.slice(0, Number(countDisplayProblem))
//             setResultProblem(sliceProblems)
//         })
//     }, [])


//     const handleChange = (e) => {
//         setLoading(true)
//         let searchValue = e.target.value;
//         const filterProblems = problems.filter(element => element.id === Number(searchValue) || element.name.match(new RegExp(searchValue, "i")))
//         console.log(filterProblems)
//         setKeyword(searchValue);    
//         setResultProblem(filterProblems)

//         setInterval(function(){ 
//             setLoading(false)
//         }, 500);
        
//     }

//     const handleChangeDisplayPro = (e) => {
//         setLoading(true)
//         const countValue = e.target.value;
//         setCountDisplayProblem(countValue);

//         const sliceProblems = problems.slice(0, Number(countValue))
//         setResultProblem(sliceProblems);

//         setInterval(function(){ 
//             setLoading(false)
//         }, 500);
//     }
//     const setDisplayListProblem = (e) =>{
//         const temproblems = [...problems];
//         if(e === "모두"){
//             setResultProblem(temproblems)
//             return;
//         }
//         const filterProblems = temproblems.filter(element => element.level === e);
//         setResultProblem(filterProblems)
//     }

//     const blockSearch = keyword ? {display: "block"} : {display: "none"};
//     const blockFotter = keyword && resultProblem.length === 0 ? {display: "none"} : {display: "block"};

//     const [diffculty, setDiffculty ] = useState(false);

//     return (
//         <ProblemBoardLayout>
//             <div className="problemboard_page">
//                 <div className="container">
//                     <div className="wrapper__search">
//                         <div className="wrapper__search-key">
//                             <input type="text" value={keyword} className="wrapper__search--text" onChange={handleChange} placeholder="이름, 번호를 입력하여 검색하세요."/>
//                             <p style = {blockSearch}>{keyword}
//                             &nbsp;<span style={{cursor: "pointer"}} onClick={() => setKeyword("")}>x</span>
//                             </p>
//                         </div>
//                         <div className="wrapper__search--filter">
//                             <div className="filter-title diffculty__container" onClick={() => setDiffculty(!diffculty)}>
//                                 난이도 
//                                 <i class="fa fa-caret-down"></i>
//                                 {
//                                     diffculty ? 
//                                         <div className="diffculty__container--select">
//                                             <p onClick={() => setDisplayListProblem("하")}>하</p>
//                                             <p onClick={() => setDisplayListProblem("중")}>중</p>
//                                             <p onClick={() => setDisplayListProblem("상")}>상</p>
//                                             <p onClick={() => setDisplayListProblem("모두")}>모두</p>
//                                         </div> :
//                                     ""
//                                 }
//                             </div>
//                         </div>
//                     </div>
//                     <div className="wrapper__problems">
//                         {
//                             loading ? 
//                             <WrapperLoading type={'bars'} color={'black'} />
//                             :
//                                 keyword ? 
//                                     resultProblem.length != 0 ?
//                                         <BoardDisplayTable boardposts = {resultProblem}/> 
//                                     :
//                                     <div style={{fontSize: '20px', textAlign: 'center', margin: '50px 0'}}>
//                                         <p>검색 문제 업습니다</p>
//                                     </div>
                                        
//                                 :
//                                     resultProblem.length != 0 ?
//                                         <BoardDisplayTable boardposts = {resultProblem} /> 

//                                     :
//                                         problems.length != 0 ?
//                                             <BoardDisplayTable boardposts = {problems} />  :
//                                         <WrapperLoading type={"bars"} color={"black"} />

//                         }
//                         <div className="row-selector" style={blockFotter}>
//                             <select class="form-control" onChange={handleChangeDisplayPro} value={countDisplayProblem}>
//                                 <option value="15">15</option>
//                                 <option value="30" selected="">30</option>
//                                 <option value="50">50</option>
//                                 <option value="100">100</option>
//                             </select>
//                             <span className="sort-caret">
//                                 게시글 수
//                             </span>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </ProblemBoardLayout>
//     )
// }

// export default ProblemBoardPage

