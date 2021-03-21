import React from 'react';
import styled from 'styled-components/macro';

import { COLORS, WEIGHTS } from '../../constants';
import {formatPrice, pluralize, isNewShoe, pxToRem} from '../../utils';
import Spacer from '../Spacer';

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
  ...props
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'

  return (
    <Link href={`/shoe/${slug}`} {...props}>
      <Wrapper>
        <ImageWrapper>
          <Image alt="" src={imageSrc} />
        </ImageWrapper>
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          <Price onSale={variant === "on-sale"}>{formatPrice(price)}</Price>
        </Row>
        <Row>
          <ColorInfo>{pluralize('Color', numOfColors)}</ColorInfo>
          <Conditional when={variant === "on-sale"}>
            <SalePrice>{formatPrice(salePrice)}</SalePrice>
          </Conditional>
        </Row>
        <Switch on={variant}>
          {{
            'on-sale': <SaleTag />,
            'new-release': <ReleasedTag />
          }}
        </Switch>
      </Wrapper>
    </Link>
  );
};

const Link = styled.a`
  text-decoration: none;
  color: inherit;
`;

const Wrapper = styled.article`
  position: relative;
  min-width: 250px;
  max-width: 325px;
`;

const ImageWrapper = styled.div`
  border-radius: 12px;
  overflow: hidden;
`;

const Image = styled.img`
  width: 100%;
`;

const Row = styled.div`
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`;

const Price = styled.span`
  color: ${p => p.onSale ? COLORS.gray[700] : undefined};
  text-decoration: ${p => p.onSale ? 'line-through' : undefined};
`;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
`;

const Tag = styled.div`
  position: absolute;
  top: 12px;
  right: -4px;
  width: fit-content;
  padding: 8px;
  color: ${COLORS.white};
  font-size: ${pxToRem(14)};
  font-weight: ${WEIGHTS.bold};
  border-radius: 2px;
`

const SaleTag = styled(Tag).attrs(() => ({children: "Sale"}))`
  background-color: ${COLORS.primary};
`

const ReleasedTag = styled(Tag).attrs(() => ({children: "Just Released!"}))`
  background-color: ${COLORS.secondary};
`

const Conditional = ({when, children}) => when ? children : null
const Switch = ({on, children}) => children[on] ?? null

export default ShoeCard;
