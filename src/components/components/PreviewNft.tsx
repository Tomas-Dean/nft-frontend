import React, { useEffect } from 'react';
import { MARKET_TYPE } from 'src/enums';
import { getImage } from 'src/services/ipfs';

import Clock from './Clock/Clock';

interface IProps {
  imageUrl: string;
  userImage: string | undefined;
  nft: {
    name: string;
    description: string;
    price: number | string;
    totalAmount?: number;
    leftAmount?: number;
    collection?: string;
  };
  marketType?: MARKET_TYPE;
  tokentype: string;
  isPreview?: boolean;
  timer?: boolean;
  multiple: boolean;
  expirationDateInput?: string;
}

export default function PreviewNft(props: IProps) {
  const {
    imageUrl,
    userImage,
    nft,
    marketType,
    tokentype,
    isPreview,
    timer,
    expirationDateInput,
    multiple
  } = props;

  const getNumberOfCopies = () => {
    if (multiple) {
      if (nft?.totalAmount) {
        return `${nft?.leftAmount}/${nft?.totalAmount}`;
      }
      return 'X0';
    } else {
      return '1/1';
    }
  };

  return (
    <div className="nft__item m-0">
      {/* {timer && marketType === MARKET_TYPE.AUCTION && ( */}

      {/* )} */}
      {/* <div className="author_list_pp">
        <span>
          <img className="lazy" src={getImage(userImage)} alt="" />
          <i className="fa fa-check"></i>
        </span>
      </div> */}
      <div className="nft__item_wrap">
        <span>
          <img
            src={getImage(imageUrl)}
            id="get_file_2"
            className="lazy nft__item_preview"
            alt=""
          />
        </span>
        <div className="de_countdown">
          <Clock deadline={expirationDateInput || 'December, 30, 2021'} />
        </div>
      </div>
      <div className="nft__item_info">
        <div className="col-12 d-flex justify-content-between mb-0 pl-0">
          <span>
            <h4>{nft?.name || '-- -- -- -- --'}</h4>
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex justify-content-between align-items-center">
                <p className="nft-collection-name">
                  <img
                    className={''}
                    src="./img/collectionIcon.png"
                    alt=""
                  ></img>
                  {nft?.collection || '-- -- -- -- -- --'}
                </p>
              </div>
            </div>
          </span>
          <div className="nft-supply-details">
            <p>
              <span>100/100</span>Supply
            </p>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <div className="nft__item_price">
            <div className="author_list_pp pulse_bottom">
              <img className={''} src="./img/currency-icon.svg" alt=""></img>
            </div>
            <div>
              {nft?.price || 0} {tokentype}
              {<span className="d-none">{getNumberOfCopies()}</span>}
            </div>
          </div>
          {isPreview && (
            <div className="nft__item_action">
              <span>
                {marketType === MARKET_TYPE.SIMPLE ? 'Buy Now' : 'Place a bid'}
              </span>
            </div>
          )}
        </div>
        {/* <div className="nft__item_like">
          <i className="fa fa-heart"></i>
          <span>50</span>
        </div> */}
      </div>
    </div>
  );
}
