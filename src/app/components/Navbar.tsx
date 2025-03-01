'use client'
import Link from 'next/link'

function NavBar () {
    return (
        <div className="option">
          <div className="options">
            <Link href="/featured">
              Featured
            </Link>
            <Link href="/kpi">
              KPI
            </Link>
            <Link href="/layout">
              Layouts
            </Link>     
            <Link href="/storyboards">
              StoryBoards
            </Link>                      
          </div>
        </div>
    );

}

export default NavBar