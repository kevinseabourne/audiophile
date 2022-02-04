import styled from "styled-components";
import CheckoutForm from "../../components/checkoutForm";
import { useRouter } from "next/router";

interface Props {}

const Checkout: React.FC<Props> = () => {
  const { push } = useRouter();
  return (
    <Container>
      <BackgroundColor />
      <CheckoutWrapper>
        <GoBack onClick={() => push("/")}>Go Back</GoBack>
        <InnerContainer>
          <CheckoutForm />
        </InnerContainer>
      </CheckoutWrapper>
    </Container>
  );
};

export default Checkout;

const Container = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.silver};
  height: 100%;
  position: relative;
`;

const BackgroundColor = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.silver};
  z-index: -1;
`;

const CheckoutWrapper = styled.div`
  max-width: 1190px;
  margin: auto;
  padding: 0px 39px;
  box-sizing: border-box;
  @media (max-width: 678px) {
    padding: 0px 24px;
  }
  @media (max-width: 500px) {
    max-width: 1160px;
  }
`;

const GoBack = styled.button`
  opacity: 0.5;
  color: ${({ theme }) => theme.colors.darkerBlack};
  margin-top: 79px;
  margin-bottom: 38px;
  &:hover {
    cursor: pointer;
  }
  @media (max-width: 1200px) {
    margin-top: 49px;
    margin-bottom: 20px;
  }
  @media (max-width: 1000px) {
    margin-top: 25px;
    margin-bottom: 20px;
  }
`;

const InnerContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
