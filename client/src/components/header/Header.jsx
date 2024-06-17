import "./header.css"

export default function Header(){
    return (
        <div className="header">
            <div className="headerTitles">
                <span className="headerTitlesSm">Bytes Bites Blog</span>
                <span className="headerTitlesLg">B3</span>
            </div>
            <img className="headerImg" src="assets/front1.jpg" alt="Header Img"/>
        </div>
    )
}

