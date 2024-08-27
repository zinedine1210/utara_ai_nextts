import { Icon } from "@iconify/react/dist/iconify.js";

const Pagination = ({page, pagerList, handleNext, handlePrev, handleBackward, handleForward, handleClickPage}: {
    page: number,
    pagerList: number,
    handleNext: any,
    handlePrev: any,
    handleBackward: any,
    handleForward: any,
    handleClickPage: any
}) => {
    let minPage = 1
    let maxPage = 5
    if(page > 3){
        minPage = page - 2
        maxPage = page + 2
        if(maxPage > pagerList){
            if(maxPage - pagerList < 2){
                minPage = page - 3
                maxPage = page + 1
            } else {
                let varPage = page - 4
                minPage = page - 4 === 0 ? 1:varPage
                maxPage = page
            }
        }
    } else {
        if(maxPage > pagerList){
            maxPage = pagerList
        }
    }
   
 
    let arrayPages = []

    for(var i=minPage, l=maxPage; i<=l; i++){
        arrayPages.push(i)
    }

    return (
        <div className="flex space-x-1">
            {
                    page > 1 ?
                    <button type="button" onClick={handleBackward} className="w-8 h-8 rounded-md flex items-center justify-center">
                        <span title="previous" >
                            <Icon icon={'prime:backward'} className="text-2xl"/>
                        </span>
                    </button>:""
            }
            {
                    page > 1 ?
                    <button type="button" onClick={handlePrev}>
                        <span title="previous" className="w-8 h-8 flex items-center justify-center">
                            <Icon icon={'tabler:chevron-left'} className="text-2xl"/>
                        </span>
                    </button>
                :""
            }
            {
                arrayPages && arrayPages.length > 0 ? arrayPages.map((e, i) => {
                        return <button key={i} onClick={() => handleClickPage(e)}><div className={`cursor-pointer flex items-center justify-center w-8 h-8 rounded-md dark:text-white ${page === e ? 'bg-blue-500 text-white':''}`} key={i}><span className={`page-link ${page === e ? '':''}`}>{e}</span></div></button>
                }):''
            }
            {
                page < pagerList ? 

                <button type="button" onClick={handleNext}>
                    <span title="previous" className="w-8 h-8 rounded-md flex items-center justify-center">
                        <Icon icon={'tabler:chevron-right'} className="text-2xl"/>
                    </span>
                </button>
                :"" 
            }
            {
                page < pagerList ?
                <button type="button" onClick={handleForward}>
                    <span title="previous" className="w-8 h-8 rounded-md flex items-center justify-center">
                        <Icon icon={'prime:forward'} className="text-2xl"/>
                    </span>
                </button>
                    :""
            }
        </div>
    );
};

export default Pagination;