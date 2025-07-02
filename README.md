```
🛍️ AI 기반 고객 페르소나 및 마케팅 대시보드
이 프로젝트는 고객 쇼핑 데이터를 K-평균 클러스터링으로 분석하여 의미 있는 고객 그룹을 정의하고, 각 그룹의 특징을 시각화하는 웹 대시보드입니다. AI(Google Gemini)를 통해 각 고객 그룹을 대표하는 가상의 페르소나를 생성하고, 데이터 기반의 맞춤형 마케팅 전략을 제안받을 수 있습니다.

✨ Live Demo: https://shoppingtrendai.netlify.app/

🚀 주요 기능
고객 세분화 시각화: K-평균 클러스터링으로 도출된 7개의 고객 그룹별 핵심 지표(평균 연령, 구매액, 구독률 등)를 직관적으로 확인합니다.

상세 데이터 분석 대시보드: 각 그룹의 Top 5 구매 아이템, 카테고리, 주요 활동 지역, 시즌별 선호도 등을 다양한 차트(막대, 도넛, 파이 등)로 시각화합니다.

클러스터 vs 전체 평균 비교: 특정 고객 그룹의 구매 패턴이 전체 고객 평균과 어떻게 다른지 혼합 차트(막대+선)를 통해 한눈에 비교하고 인사이트를 얻을 수 있습니다.

AI 페르소나 생성: Google AI가 각 클러스터의 데이터를 바탕으로, 해당 그룹을 대표하는 가상의 인물(이미지, 직업, 특징, 니즈)을 생성하여 고객에 대한 깊이 있는 이해를 돕습니다.

AI 마케팅 전략 제안: 선택된 클러스터의 데이터 특성에 기반하여, 실행 가능한 구체적인 마케팅 액션 플랜을 AI에게 제안받을 수 있습니다.

🛠️ 기술 스택
Frontend: React, TypeScript, Next.js (App Router)

Styling: Tailwind CSS

Charts: Chart.js, react-chartjs-2, chartjs-plugin-datalabels

AI: Google Gemini API (@google/genai)

Data Analysis (Offline): Python, Jupyter Notebook, Pandas, Scikit-learn

Deployment: Netlify


📊 데이터 분석 과정 요약
대시보드에 사용된 고객 세분화 및 비교 데이터는 shopping_trends_updated.csv 파일에 대한 오프라인 분석을 통해 생성되었습니다. 전체 분석 과정과 코드는 아래 Jupyter Notebook에서 확인하실 수 있습니다.

➡️ 전체 분석 과정 및 코드 보기

1. 분석 목표
고객 구매 데이터를 기반으로 의미 있는 고객 그룹(세그먼트)을 정의하고, 각 그룹의 고유한 특징을 프로파일링합니다.

각 그룹의 구매 패턴이 전체 고객 평균과 어떻게 다른지 비교 분석할 수 있는 데이터를 생성하여, 대시보드에서 깊이 있는 인사이트를 제공하는 것을 목표로 합니다.

2. 데이터 처리 및 모델링
피처 선택: 고객 세분화를 위해 'Age', 'Purchase Amount (USD)', 'Subscription Status', 'Frequency of Purchases' 4가지 주요 피처를 사용했습니다.

K-평균 클러스터링:

최적 클러스터 개수(K) 결정: 엘보우 방법과 실루엣 분석을 통해 최적의 K값을 7로 결정했습니다.

(참고: 아래 이미지는 실제 분석 결과 그래프로 교체해야 합니다.)
결과 데이터 생성:

각 클러스터별 Top 아이템, 카테고리, 지역, 시즌 데이터와 함께 전체 고객의 아이템별 평균 구매율 데이터를 overall_items_purchase_rate로 추가하여 JSON 파일을 생성했습니다.

이 데이터를 통해 대시보드에서 '클러스터 vs 전체' 비교 차트 구현이 가능해졌습니다.

3. 분석 결과의 대시보드 활용
생성된 customer_segments_final.json 파일은 대시보드에서 각 클러스터의 특성을 시각화하고, AI 기능의 입력 정보로 사용됩니다.


네, 알겠습니다. 프로젝트의 모든 기능과 과정을 반영하여, 바로 복사해서 사용할 수 있는 완성된 README.md 파일을 만들어 드리겠습니다.

🛍️ AI 기반 고객 페르소나 및 마케팅 대시보드
이 프로젝트는 고객 쇼핑 데이터를 K-평균 클러스터링으로 분석하여 의미 있는 고객 그룹을 정의하고, 각 그룹의 특징을 시각화하는 웹 대시보드입니다. AI(Google Gemini)를 통해 각 고객 그룹을 대표하는 가상의 페르소나를 생성하고, 데이터 기반의 맞춤형 마케팅 전략을 제안받을 수 있습니다.

✨ Live Demo: https://shoppingtrendai.netlify.app/

🚀 주요 기능
고객 세분화 시각화: K-평균 클러스터링으로 도출된 7개의 고객 그룹별 핵심 지표(평균 연령, 구매액, 구독률 등)를 직관적으로 확인합니다.

상세 데이터 분석 대시보드: 각 그룹의 Top 5 구매 아이템, 카테고리, 주요 활동 지역, 시즌별 선호도 등을 다양한 차트(막대, 도넛, 파이 등)로 시각화합니다.

클러스터 vs 전체 평균 비교: 특정 고객 그룹의 구매 패턴이 전체 고객 평균과 어떻게 다른지 혼합 차트(막대+선)를 통해 한눈에 비교하고 인사이트를 얻을 수 있습니다.

AI 페르소나 생성: Google AI가 각 클러스터의 데이터를 바탕으로, 해당 그룹을 대표하는 가상의 인물(이미지, 직업, 특징, 니즈)을 생성하여 고객에 대한 깊이 있는 이해를 돕습니다.

AI 마케팅 전략 제안: 선택된 클러스터의 데이터 특성에 기반하여, 실행 가능한 구체적인 마케팅 액션 플랜을 AI에게 제안받을 수 있습니다.

🛠️ 기술 스택
Frontend: React, TypeScript, Next.js (App Router)

Styling: Tailwind CSS

Charts: Chart.js, react-chartjs-2, chartjs-plugin-datalabels

AI: Google Gemini API (@google/genai)

Data Analysis (Offline): Python, Jupyter Notebook, Pandas, Scikit-learn

Deployment: Netlify

📊 데이터 분석 과정 요약
대시보드에 사용된 고객 세분화 및 비교 데이터는 shopping_trends_updated.csv 파일에 대한 오프라인 분석을 통해 생성되었습니다. 전체 분석 과정과 코드는 아래 Jupyter Notebook에서 확인하실 수 있습니다.

➡️ **[전체 분석 과정 및 코드 보기](./notebooks/Shopping_Trends.ipynb)**

1. 분석 목표
고객 구매 데이터를 기반으로 의미 있는 고객 그룹(세그먼트)을 정의하고, 각 그룹의 고유한 특징을 프로파일링합니다.

각 그룹의 구매 패턴이 전체 고객 평균과 어떻게 다른지 비교 분석할 수 있는 데이터를 생성하여, 대시보드에서 깊이 있는 인사이트를 제공하는 것을 목표로 합니다.

2. 데이터 처리 및 모델링
피처 선택: 고객 세분화를 위해 'Age', 'Purchase Amount (USD)', 'Subscription Status', 'Frequency of Purchases' 4가지 주요 피처를 사용했습니다.

K-평균 클러스터링:

최적 클러스터 개수(K) 결정: 엘보우 방법과 실루엣 분석을 통해 최적의 K값을 7로 결정했습니다.

(참고: 아래 이미지는 실제 분석 결과 그래프로 교체해야 합니다.)
결과 데이터 생성:

각 클러스터별 Top 아이템, 카테고리, 지역, 시즌 데이터와 함께 전체 고객의 아이템별 평균 구매율 데이터를 overall_items_purchase_rate로 추가하여 JSON 파일을 생성했습니다.

이 데이터를 통해 대시보드에서 '클러스터 vs 전체' 비교 차트 구현이 가능해졌습니다.

3. 분석 결과의 대시보드 활용
생성된 customer_segments_final.json 파일은 대시보드에서 각 클러스터의 특성을 시각화하고, AI 기능의 입력 정보로 사용됩니다.

⚙️ 시작하기
프로젝트를 로컬 환경에서 실행하는 방법은 다음과 같습니다.

저장소 복제(Clone)

Bash

git clone https://github.com/hagalaz-star/shopping_trend.git
cd shopping_trend
의존성 설치

Bash

npm install
환경 변수 설정

프로젝트 루트에 .env.local 파일을 생성합니다.

Google AI Studio에서 발급받은 API 키를 아래와 같이 추가합니다.

GEMINI_API_KEY=여러분의_API_키를_여기에_입력하세요
개발 서버 실행

Bash

npm run dev
이제 브라우저에서 http://localhost:3000으로 접속하여 대시보드를 확인할 수 있습니다.
```
