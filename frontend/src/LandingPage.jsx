import Navigation from "./Navigation";
import Description from "./Description";
import StudentTools from "./StudentTools";
import Footer from "./Footer";
import Reviews from "./Reviews";
import Info from "./Info";
import Subscription from "./Subscription";
function LandingPage(){
    return (
    <>
      <div className="container-fluid">
        <div
          className="row"
          
        >
          <div className="col">
            <Navigation />
          </div>
        </div>

        <div
          className="row"
          style={{ padding:"15px 0"}}
        >
          <Description />
        </div>

        <div
          className="row"
          style={{  backgroundColor:"darkblue", padding:"20px 0" }}
        >
          <div className="col">
            <StudentTools />
          </div>

          
        </div>
        <div className="row"
          style={{ padding: "20px 0",backgroundColor:"white",borderBottom:"3px solid darkblue"}}>
            <div className="col"><Info /></div> 
          </div>
         <div className="row">

         <Subscription />

         </div>
         <div className="row">
          <Reviews />
         </div>
         
        <div
          className="row"
         
        >
          <Footer />
        </div>
      </div>
    </>
  );

}
export default LandingPage;