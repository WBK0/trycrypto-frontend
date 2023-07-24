import styled from "styled-components";

export const Wrapper = styled.div`
  height: 350px;
  background-color: var(--theme-dark);
  border-radius: 12px;
 
` 

export const HeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`

export const Header = styled.span`
  padding: 12px 12px 0px 12px;
  text-transform: uppercase;
  font-size: 15px;
  font-weight: 600;
`

interface IType {
  type?: 'long' | 'short';
}

export const Type = styled.span<IType>`
  padding: 12px 12px 0px 12px;
  text-transform: uppercase;
  font-size: 14px;
  font-weight: 600;
  color: ${props => props.type == 'long' ? 'rgb(7, 119, 3)' : 'rgb(119, 3, 3)'};
`

export const ContentWrapper = styled.div`
  padding: 12px;
  overflow-y: auto;
  &::-webkit-scrollbar{
   width: 5px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: grey;
    border-radius: 10px;
  }
  ::-webkit-scrollbar-track {
    background-color: var(--theme-primary);
  }
  height: 3 15px;
`

export const ContentRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 4px;
  width: 100%;
`

export const Pair = styled.span`
  color: var(--font-grey);
  font-size: 14px;
  font-weight: 600;
`

export const Quantity = styled.span`

`

export const NoAssets = styled.div`
  font-size: 15px;
  padding-top: 20px;
  text-align: center;
  color: rgb(100, 100, 100);
`