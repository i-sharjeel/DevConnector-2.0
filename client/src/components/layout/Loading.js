import { Fragment } from "react";
import Lottie from "react-lottie";
import loading from '../../img/loading.json'

const Loading = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: loading,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };
    return <>
        <Fragment>
            <div style={{ height: "100vh", display: "flex", alignItems: "center" }}>
                <Lottie
                    options={defaultOptions}
                    height={200}
                    width={200}
                />
            </div>
        </Fragment>
    </>
}

export default Loading;