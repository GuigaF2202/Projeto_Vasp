// Componente de Loading
import loadingGif from './assets/loading.gif';

function Loader() {
  return (
    <div className="overlay">
      <img src={loadingGif} alt="Loading" />
    </div>
  );
}
export default Loader;