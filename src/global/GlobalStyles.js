import { createGlobalStyle, css } from "styled-components";
const GlobalStyles = createGlobalStyle`
:root {
    &.light-mode{
        --color--bg: #f8f7fa; // --color--secondary_4
        --color--heading: #57534e; // --color--secondary_8
        --color--white: #fff;

        --color--secondary_1: #fafaf9;
        --color--secondary_2: #f5f5f4;
        --color--secondary_3: #e7e5e4;
        --color--secondary_4: #d6d3d1;
        --color--secondary_5: #a8a29e;
        --color--secondary_6: #78716c;
        --color--secondary_7: #57534e;
        --color--secondary_8: #44403c;
        --color--secondary_9: #292524;
        --color--secondary_10: #1c1917;
        --color--secondary_11: #0c0a09;

        --color--main_1:#eff6ff;
        --color--main_2:#dbeafe;
        --color--main_3:#bfdbfe;
        --color--main_4:#93c5fd;
        --color--main_5:#60a5fa;
        --color--main_6:#3b82f6;
        --color--main_7:#2563eb;
        --color--main_8:#1d4ed8 ;
        --color--main_9:#1e40af;
        --color--main_10:#1e3a8a;
        --color--main_11:#172554;
    }
    &.dark-mode{
      --color--bg:  #1e293b; // --color--secondary_4
        --color--heading: #fafaf9; // --color--secondary_8
        --color--white: #94a3b8;

        --color--secondary_1: #0c0a09;
        --color--secondary_2: #1c1917;
        --color--secondary_3: #292524;
        --color--secondary_4: #44403c;
        --color--secondary_5: #57534e;
        --color--secondary_6: #78716c;
        --color--secondary_7: #fafaf9;
        --color--secondary_8: #d6d3d1;
        --color--secondary_9: #e7e5e4;
        --color--secondary_10: #f5f5f4;
        --color--secondary_11: #fafaf9;
        
        --color--main_1:#eff6ff;
        --color--main_2:#dbeafe;
        --color--main_3:#bfdbfe;
        --color--main_4:#93c5fd;
        --color--main_5:#60a5fa;
        --color--main_6:#3b82f6;
        --color--main_7:#2563eb;
        --color--main_8:#1d4ed8 ;
        --color--main_9:#1e40af;
        --color--main_10:#1e3a8a;
        --color--main_11:#172554;
    }


   

    --color--red_1: #fef2f2 ;
    --color--red_2: #fee2e2 ;
    --color--red_3: #fecaca;
    --color--red_4: #fca5a5 ;
    --color--red_5: #f87171;
    --color--red_6: #ef4444 ;
    --color--red_7: #dc2626 ;
    --color--red_8: #b91c1c  ;
    --color--red_9: #991b1b ;
    --color--red_10:#7f1d1d ;
    --color--red_11: #450a0a;


    --color--green_1: #f0fdf4  ;
    --color--green_2: #dcfce7  ;
    --color--green_3: #bbf7d0 ;
    --color--green_4: #86efac  ;
    --color--green_5: #4ade80 ;
    --color--green_6:  #22c55e ;
    --color--green_7: #16a34a  ;
    --color--green_8: #15803d   ;
    --color--green_9:  #166534 ;
    --color--green_10: #14532d ;
    --color--green_11: #052e16 ;

    --color--yellow_1: #fefce8;
    --color--yellow_2: #fef9c3;
    --color--yellow_3: #fef08a;
    --color--yellow_4: #fde047;
    --color--yellow_5: #facc15;
    --color--yellow_6: #eab308;
    --color--yellow_7: #ca8a04;
    --color--yellow_8: #a16207;
    --color--yellow_9: #854d0e;
    --color--yellow_10:#713f12;
    --color--yellow_11:#422006;

}



 ::-webkit-scrollbar {
    width: 1.2rem;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background-color: var(--color--main_7);
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: var(--color--main_6);;
  }
*,
*::before,
*::after {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}
html {
  font-size: 62.5%;
}
@media screen and (max-width: 1063px){
  html {
    font-size: 50%;
  }
}
@media screen and (max-width: 500px){
  html {
    font-size: 25%;
  }
}


body {
  font-family: "Inter", sans-serif;
  min-height: 100vh;
  font-size: 1.6rem; 
  background-color: var(--color--bg);

}

*:disabled {
  cursor: not-allowed;
}

p{    
  font-family: "Inter", sans-serif;
  font-weight: 500;
  overflow-wrap: break-word;
  hyphens: auto;
  line-height: 1.7;
  color: var(--color--secondary_7);
  font-size: 1.4rem;
}

h1,
h2,
h3,
h4,
h5,
h6 {
    font-family: "Inter", sans-serif;
  overflow-wrap: break-word;
  hyphens: auto;  
  font-weight: 500;
  color: var( --color--heading);
    line-height: 1.7;

}
button{
  &:disabled{
    cursor: not-allowed;
  }
}
.textCenter{
  text-align: center;
}

.textHighlight{
  background-color: var(--color--red_5);
  color:var(--color--secondary_1);
  padding: 0 .4rem;
  box-sizing:content-box;
}
.deleteText{
  text-decoration: line-through;
}
.underline{
  text-decoration: underline;
}
.bold{
  font-weight: 700;
}
.semibold{
  font-weight: 600;
}
.italic{

}
.textLight{
    color: var(--color--secondary_5);

}
.flex{
  display: flex;
}
.flexColumn{
  flex-direction:column;
}
.flexCenter{
  align-items: center;
}
.flexBaseline{
  align-items: baseline;
}
.flexEnd{
  align-items: flex-end;
  justify-content: end;
}
.g-spaceBetween{
  justify-content:space-between;
}
.g-center{
  justify-content: center;
}
.g-16{
  gap:1.6rem
}
.g-32{
  gap:3.2rem
}
.g-24{
  gap:2.4rem;
}
.g-8{
  gap: 0.8rem;
}
.w-100{
  width: 100%;
}
.gradient-text {
  font-weight: bold; 
  background-image: linear-gradient(to top, var(--color--main_6), var(--color--main_7)); 
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent; 
  display: inline-block; 
}
.m-1{
  margin: .4rem;
}
.m-2{
  margin: .8rem;
}
.m-3{
  margin: 1.6rem;
}
.m-4{
  margin: 2.4rem;
}
.m-5{
  margin: 3.2rem;
}
.mt-1{ margin-top: .4rem;}
.mt-2{ margin-top: .8rem;}
.mt-3{ margin-top: 1.6rem;}
.mt-4{ margin-top: 2.4rem;}
.mt-5{ margin-top: 3.2rem;}
.mb-1{
  margin-bottom: .4rem;
}
.mb-2{
  margin-bottom: .8rem;
}
.mb-3{
  margin-bottom: 1.6rem;
}
.mb-4{
  margin-bottom: 2.4rem;
}
.mb-5{
  margin-bottom: 3.2rem;
}
.mr-1{
  margin-right:.4rem;
}
.mr-2{
  margin-right:.8rem;
}
.mr-3{
  margin-right:1.6rem;
}
.mr-4{
  margin-right:2.4rem;
}
.mr-5{
  margin-right:3.2rem;
}
.ml-1{
  margin-left:.4rem;
}
.ml-2{
  margin-left:.8rem;
}
.ml-3{
  margin-left:1.6rem;
}
.ml-4{
  margin-left:2.4rem;
}
.ml-5{
  margin-left:3.2rem;
}
.h-50{
  height: 50vh;
}
.h-80{
  height: 80vh;
}
.h-100{
  height: 100vh;
}
`;

export default GlobalStyles;
