
import { Insights } from '../dataType';
interface inSightprops {
  item: Insights[];
} 
const Insight: React.FC<inSightprops> = ({ item }) => {
    console.log(item)
  return (
    <div>
       <div className="insight">Insights</div>
       {Object.keys(item).map((title:string,index) => (
         <div key = {index} className="insightswrapper">
            <div className="insighteach">
              <div className="insightstitle">{title}</div>
               {item[title].map((insig:string,subindex:number) => (
                  <div className="insightdetail" key={subindex}>{insig}</div>
               ))}
            </div>   
         </div>
       ))}
    </div>
  )
};
export default Insight