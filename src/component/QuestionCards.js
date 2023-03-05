import React, { useEffect, useState } from 'react'
import './_main.css';
import Pagination from '@mui/material/Pagination';
import { MathJax, MathJaxContext } from 'better-react-mathjax';

function QuestionCards() {

    const [quest, setQuest] = useState("");
    const [page, setPage] = useState(1);
    const [err,setErr]  = useState("");
    const [query, setQuery] = useState("AreaUnderTheCurve_901");
    const [questHeading, setQuestHeading] = useState("Area Under The Curve")

    const handleChange = (e, p) => {
        // debugger
        if (p === 1) {
            setQuery("AreaUnderTheCurve_901");
            setQuestHeading("Area Under The Curve")
        } else if (p === 2) {
            setQuery("BinomialTheorem_901");
            setQuestHeading("Binomial Theorem")
        } else if (p === 3) {
            setQuery("DifferentialCalculus2_901");
            setQuestHeading("Differential Calculus 2")
        }
        setPage(p)
    }

    const fetchData = async () => {
        const response = await fetch(`https://0h8nti4f08.execute-api.ap-northeast-1.amazonaws.com/getQuestionDetails/getquestiondetails?QuestionID=${query}`,{method: "GET",});
        response.json()
        .then((data) => {
            if (data && data.length > 0) {
                setQuest(data[0].Question.toString());            
            }
        })
        .catch((error) => {
            setErr(error);
        });
    };

    useEffect(() => {
        fetchData();
        handleChange();
    }, [query]);
  return (
    <div className='main_container'>
        <div className='quest_container'>
            <div className='quest_heading'>{questHeading}</div>
            <span className='quest_title'>
                <MathJaxContext>
                    <MathJax>
                        {quest}
                    </MathJax>
                </MathJaxContext>
            </span>
            <div className='ans_option'>
                <div className='option'>
                    <input type="radio" id="a" name="quest" value="quest_A"/>
                    <label htmlFor="a">Answer A</label>
                </div>
                <div className='option'>
                    <input type="radio" id="b" name="quest" value="quest_B"/>
                    <label htmlFor="b">Answer B</label>
                </div>
                <div className='option'>
                    <input type="radio" id="c" name="quest" value="quest_C"/>
                    <label htmlFor="c">Answer C</label>
                </div>
                <div className='option'>
                    <input type="radio" id="d" name="quest" value="quest_D"/>
                    <label htmlFor="d">Answer D</label>
                </div>
            </div>
        </div>
        <div className='pagination_container'>
            <Pagination 
                count={3} 
                variant="outlined" 
                shape="rounded" 
                onChange={handleChange}/>
        </div>
    </div>
  )
}

export default QuestionCards