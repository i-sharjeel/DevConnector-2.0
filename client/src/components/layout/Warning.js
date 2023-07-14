import React from 'react'
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { connect } from 'react-redux';

const Warning = () => {
    const data = useSelector((state) => state?.alert);

    return (<>
        {data && data.length > 0 && data[0] ? data.map(x => {
            return <>
                <h4 className={`alert alert-${x.alertType}`} key={x.id}>{x.msg}</h4>
            </>
        }) : ""}
    </>
    )
}

export default connect()(Warning);