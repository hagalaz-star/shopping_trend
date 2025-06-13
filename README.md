# 🛍️ 고객 쇼핑 트렌드 대시보드 TOOL

이 프로젝트는 고객 쇼핑 데이터를 분석하여 고객 그룹을 나누고, 각 그룹별 특징을 시각화하여 맞춤형 마케팅 아이디어를 제공하는 웹 대시보드입니다.

**Live Demo:** [https://shoppingtrendai.netlify.app/](https://shoppingtrendai.netlify.app/)

## 🚀 주요 기능

- K-평균 클러스터링 기반 고객 세분화 결과 시각화
- 클러스터별 주요 지표 (고객 수, 평균 연령, 구매 빈도 등) 표시
- 세그먼트별 구매 특성 비교 (평균 구매액, 구독률 등)
- AI 기반 마케팅 제안 (Gemini API 연동)

## 🛠️ 기술 스택

- **Frontend:** React, TypeScript, Next.js (App Router)
- **Styling:** Tailwind CSS
- **Charts:** Chart.js
- **Data Analysis (Offline):** Python, Jupyter Notebook (상세 과정은 아래 참고)
- **Deployment:** Netlify

---

## 📊 고객 쇼핑 트렌드 데이터 분석 과정 요약

대시보드에 사용된 고객 세분화 데이터는 `shopping_trends_updated.csv` 파일에 대한 분석을 통해 얻어졌습니다. 전체 분석 과정과 코드는 아래 Jupyter Notebook에서 확인하실 수 있습니다.

➡️ **[전체 분석 과정 및 코드 보기](./notebooks/Shopping_Trends.ipynb)**


### 1. 분석 목표

- 고객의 구매 행동 데이터(나이, 구매 금액, 구독 상태, 구매 빈도 등)를 분석하여 의미 있는 고객 그룹(세그먼트)을 정의합니다.
- 각 세그먼트의 주요 특징을 파악하여, 이를 기반으로 대시보드에 시각화하고 맞춤형 마케팅 전략 수립에 활용할 수 있는 기초 자료를 생성하는 것을 목표로 합니다.

### 2. 데이터 출처 및 설명

- **사용한 데이터셋:** `shopping_trends_updated.csv` 파일
  - _(https://www.kaggle.com/datasets/bhadramohit/customer-shopping-latest-trends-dataset)_
- **주요 포함 정보:** (총 18개 컬럼)
  - Customer ID, Age, Gender, Item Purchased, Category
  - Purchase Amount (USD), Location, Size, Color, Season
  - Review Rating, Subscription Status, Shipping Type
  - Discount Applied, Promo Code Used, Previous Purchases
  - Payment Method, Frequency of Purchases
- 데이터 기본 탐색 결과, 결측치는 없는 것으로 확인되었습니다.

### 3. 분석 과정 및 방법론

#### 데이터 불러오기 및 초기 탐색

- Pandas 라이브러리를 사용하여 CSV 데이터를 로드하고, 데이터의 기본적인 구조와 통계치를 확인했습니다. (`head()`, `tail()`, `info()`, `describe()` 사용)

#### 피처 선택 및 전처리

- 고객 세분화를 위해 'Age', 'Purchase Amount (USD)', 'Subscription Status', 'Frequency of Purchases' 4가지 주요 피처를 선택했습니다.
- 범주형 데이터는 Pandas의 `get_dummies()` 함수를 사용하여 원-핫 인코딩 처리 후, 모든 데이터를 숫자형으로 변환했습니다.

#### 데이터 스케일링

- 선택된 숫자형 피처들에 대해 Scikit-learn의 `StandardScaler`를 사용하여 표준화 스케일링을 진행했습니다. 이는 K-평균 클러스터링 알고리즘의 성능 향상을 위함입니다.

#### 고객 세분화 모델링 (K-평균 클러스터링)

- **최적 클러스터 개수(K) 결정:**
  - **엘보우 방법(Elbow Method):** K값 변화에 따른 WCSS 감소폭을 시각화하여 분석했습니다.
    ![Elbow Method for Optimal K](./notebooks/images/elbow_method.png)
    _(↑ `elbow_method.png`는 `notebooks/images/` 폴더에 저장되어야 합니다.)_
  - **실루엣 분석(Silhouette Analysis):** 평균 실루엣 점수를 계산했으며, K=7일 때 0.5176으로 가장 높은 점수를 보여 최종 클러스터 수를 7개로 결정했습니다.
    ![Silhouette Analysis for Optimal K](./notebooks/images/silhouette_analysis.png)
    _(↑ `silhouette_analysis.png`는 `notebooks/images/` 폴더에 저장되어야 합니다.)_
- **최종 모델 학습:** K=7로 설정하여 K-평균 클러스터링 모델을 학습시키고, 각 고객에게 클러스터 레이블을 할당했습니다.

#### 세그먼트 프로파일링 및 결과 저장

- 생성된 7개 클러스터의 특징(평균 연령, 구매액, 구독률, 주요 구매 빈도 등)을 분석하고, 설명적인 이름 및 마케팅 제안을 정의했습니다. (예: "2주 주기 실속형 고객")
- 이 모든 정보를 `customer_segments_k7.json` 파일로 저장하여, 대시보드 애플리케이션에서 활용하도록 준비했습니다.

#### (참고) PCA를 활용한 시각화

- K-평균 클러스터링 결과를 시각적으로 탐색하기 위해 PCA를 사용하여 데이터를 2차원으로 축소하고, 클러스터별로 산점도를 시각화했습니다.
  ![K-Means Clustering (K=7) visualized with 2D PCA](./notebooks/images/pca_clusters_k7.png)
  _(↑ `pca_clusters_k7.png`는 `notebooks/images/` 폴더에 저장되어야 합니다.)_

### 4. 사용된 주요 기술 스택 (데이터 분석)

- Python
- **[Pandas](https://pandas.pydata.org/)** (데이터 조작 및 분석)
- NumPy (수치 계산)
- Scikit-learn (StandardScaler, PCA, KMeans, silhouette_score 등 머신러닝)
- Matplotlib, Seaborn (데이터 시각화)

### 5. 분석 결과의 대시보드 애플리케이션 활용 방안

`customer_segments_k7.json` 파일의 데이터는 대시보드에서 다음과 같이 활용됩니다:

- 각 고객 그룹의 특징(고객 수, 평균 연령, 평균 구매액 등)을 차트와 카드로 시각화합니다.
- AI 마케팅 제안 기능의 기초 입력 정보로 사용됩니다.

---
