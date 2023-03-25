import './BackgroundPlane.css';

export const BackgroundPlane = () => {
  return (
    <div id="base" className="h-80 w-full">
      <div id="bg">
        <div className="wrap">
          <div className="top-plane"></div>
          <div className="bottom-plane"></div>
        </div>
      </div>
    </div>
  );
};
