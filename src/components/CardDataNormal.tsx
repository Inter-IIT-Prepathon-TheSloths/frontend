import React from 'react';

interface CardDataNormalProps {
    title: string;
    value: number | string;
    sub_title: string;
}

const CardDataNormal: React.FC<CardDataNormalProps> = ({
    title,
    value,
    sub_title
}) => {
    return (
        <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
            <p>
                {title}
            </p>

            <div className="mt-4 flex items-end justify-between">
                <div>
                    <h4 className="text-title-md font-bold text-black dark:text-white">
                        {value}
                    </h4>
                    <span className="text-sm font-medium">{sub_title}</span>
                </div>
            </div>
        </div>
    );
};

export default CardDataNormal;
