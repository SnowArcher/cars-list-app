import { useEffect, useState } from "react";

export default function Pagination({totalPosts, postsPerPage, setCurrentPage, currentPage}) {
    const pages = [];
    for(let i = 1; i <= Math.ceil(totalPosts/postsPerPage); i++) {
        pages.push(i);
    }
    useEffect(() => {
        if (currentPage > Math.ceil(totalPosts/postsPerPage) && currentPage != 1) {

            if (pages.slice(firstButton, lastButton).length == 0) {
                setFirst(firstButton - 6); 
                setLast(lastButton - 6);
            }
            setCurrentPage(Math.ceil(totalPosts/postsPerPage));
        }
    }, [totalPosts])
    const [firstButton, setFirst] = useState(0);
    const [lastButton, setLast] = useState(6);
    return (
        <div className="pagination">
            <button className={`prevbtn ${lastButton <= 6? '' : 'active'}`} onClick={() => 
                    {
                        setFirst(firstButton - 6); 
                        setLast(lastButton - 6);
                        setCurrentPage(pages[lastButton - 7]);
                    }
                }>prev</button>
            {
                pages.slice(firstButton, lastButton).map((page, index) => {
                    return <button key={index} className={`pagebtn ${page === currentPage? 'active' : ''}`} onClick={() => setCurrentPage(page)}>{page}</button>
                })
            }
            <button className={`nextbtn ${firstButton >= pages.length - 6? '' : 'active'}`} onClick={() => 
                    {
                        setFirst(firstButton + 6); 
                        setLast(lastButton + 6);
                        setCurrentPage(pages[firstButton + 6]);
                    }
                }>next</button>
        </div>
    )
}