/* eslint-disable max-len */
import { path, svg } from "./svg"

const viewBox = "0 0 24 24"

const icons = [
  path("m0.9494 21.665c0.38405 0.48182 0.95036 0.80203 1.5504 0.9421s1.232 0.10778 1.8319-0.03275c1.206-0.28251 2.3076-1.0172 2.9989-2.045 0.85348-1.2689 1.0447-2.883 0.90593-4.4059-0.13879-1.5229-0.57842-2.9998-0.88906-4.4972-0.31065-1.4974-0.49066-3.0645-0.11074-4.5458 0.18996-0.74065 0.52162-1.4504 1.0097-2.0389 0.48811-0.58856 1.1367-1.052 1.8683-1.2742 0.85067-0.2583 1.7886-0.17988 2.6099 0.16048 0.82129 0.34037 1.5271 0.93287 2.0562 1.6473 1.0583 1.4288 1.3938 3.2766 1.3912 5.0546-0.0026 1.7484-0.30106 3.4875-0.28255 5.2358 0.0093 0.87416 0.09892 1.7522 0.34026 2.5924 0.24133 0.84024 0.63866 1.6435 1.2178 2.2983 0.71185 0.80482 1.7152 1.3727 2.7862 1.4586 0.53551 0.04299 1.082-0.03406 1.5794-0.23706 0.4974-0.20299 0.94436-0.53292 1.2736-0.95748 0.41153-0.53076 0.63254-1.2273 0.51134-1.8878-0.0606-0.33029-0.20561-0.64631-0.42582-0.89983s-0.51615-0.44272-0.84182-0.52461c-0.23817-0.05988-0.49116-0.06226-0.72931-0.0023-0.23816 0.05994-0.46086 0.18254-0.63564 0.35506-0.17479 0.17251-0.30076 0.39483-0.35441 0.63448-0.05366 0.23965-0.03416 0.49584 0.05939 0.72291 0.09573 0.23235 0.26285 0.42659 0.40219 0.63572 0.06967 0.10457 0.13307 0.21421 0.17613 0.33225s0.06527 0.24521 0.05117 0.37007c-0.01233 0.10914-0.05243 0.21469-0.1133 0.30611s-0.14225 0.16874-0.23514 0.22734c-0.18579 0.11719-0.41464 0.15712-0.63284 0.13174-0.21819-0.02538-0.42612-0.11307-0.61018-0.23295-0.18407-0.11988-0.34564-0.27138-0.49523-0.43224-0.88955-0.95657-1.3606-2.2462-1.5167-3.5431-0.15606-1.2969-0.01825-2.6111 0.17986-3.9022 0.1981-1.2912 0.4568-2.576 0.54413-3.8793s-0.0035-2.6413-0.48287-3.8564c-0.40143-1.0175-1.0715-1.9257-1.9162-2.6206s-1.8613-1.1765-2.9312-1.404c-2.1398-0.45501-4.4565 0.14354-6.177 1.4947-1.7205 1.3512-2.8391 3.4126-3.1444 5.5788-0.30526 2.1662 0.18245 4.4178 1.2596 6.3219 0.37811 0.66836 0.82604 1.296 1.1879 1.9733 0.36188 0.67728 0.63937 1.4213 0.63734 2.1892-0.00102 0.38395-0.07339 0.76979-0.23181 1.1195-0.15842 0.34974-0.40464 0.66233-0.72033 0.88087s-0.7016 0.33978-1.085 0.31992c-0.38343-0.019868-0.76123-0.18504-1.0214-0.46743-0.23726-0.25754-0.36731-0.59337-0.49114-0.92091-0.12383-0.32755-0.25165-0.66382-0.4858-0.92419-0.17731-0.19717-0.41161-0.34249-0.66703-0.41372-0.25542-0.071234-0.53111-0.06814-0.78487 0.008809-1.263 0.41023-0.8011 2.1525-0.41695 2.9536z"),
  path("m7.366 19.001c-0.13867-1.7215-0.045232-3.4616 0.27698-5.1583 0.27833-1.4657 0.74521-2.9341 1.6683-4.1061 0.46157-0.58598 1.0347-1.0896 1.6971-1.4326 0.66237-0.34304 1.4156-0.52151 2.1596-0.46794 0.7003 0.05042 1.3799 0.3052 1.9626 0.69683 0.58274 0.39163 1.0702 0.91717 1.4498 1.5078 0.75913 1.1813 1.0798 2.5948 1.2075 3.9932 0.14476 1.5858 0.05744 3.1927-0.25833 4.7535l4.1557 0.08183c0.78294-1.9736 0.88343-4.2107 0.2806-6.2466s-1.9051-3.8576-3.6364-5.0867c-2.5838-1.8344-6.1012-2.2628-9.0568-1.12s-5.2655 3.8163-5.9859 6.9022c-0.42782 1.8325-0.31559 3.7877 0.31911 5.5592z"),
  path("m12.125 12.084c1.2909 0.25277 2.5065 0.87871 3.4621 1.7827s1.648 2.083 1.9719 3.358l3.2693 1.2731c1.0777-1.9405 1.4768-4.2495 1.1132-6.4392-0.36367-2.1897-1.4877-4.2457-3.1348-5.7337-1.7607-1.5906-4.1079-2.5167-6.4804-2.5567-2.3724-0.040027-4.7496 0.80633-6.5629 2.3367s-3.0472 3.7314-3.4065 6.0768c-0.3593 2.3454 0.15907 4.8149 1.4311 6.8179-0.015513-2.0649 0.93893-4.1167 2.5283-5.4351 1.5893-1.3184 3.7821-1.8772 5.8086-1.4805z"),
  path("m2.9588 15.277c-0.44015-0.109-0.8495-0.33673-1.1785-0.6488s-0.57732-0.7074-0.72152-1.1373c-0.2884-0.8598-0.14222-1.8442 0.34578-2.6085 0.49911-0.78178 1.3067-1.3137 2.1349-1.7312 2.5332-1.2769 5.4691-1.6816 8.281-1.3063 2.8119 0.37526 5.4983 1.5099 7.8315 3.1236 0.96066 0.66442 1.8771 1.4225 2.547 2.3793s1.0776 2.1352 0.94097 3.2952c-0.06832 0.58001-0.27308 1.1467-0.613 1.6216-0.33991 0.47491-0.81677 0.85512-1.3649 1.0567s-1.1663 0.21938-1.7173 0.02562c-0.55094-0.19376-1.0278-0.60262-1.2812-1.1288-0.20361-0.42281-0.26077-0.90356-0.24327-1.3725 0.0175-0.46896 0.10625-0.93186 0.18146-1.3951 0.07522-0.46322 0.13725-0.9329 0.10078-1.4008-0.036472-0.46787-0.17816-0.9383-0.47288-1.3035-0.26724-0.33116-0.64892-0.55987-1.0567-0.68141-0.40781-0.12154-0.84125-0.14037-1.2648-0.09879-0.847 0.08317-1.6511 0.40061-2.48 0.59382-0.78411 0.18279-1.5887 0.25689-2.3858 0.37098-0.79701 0.1141-1.59 0.275-2.3495 0.5422-0.7595 0.2672-1.4752 0.64299-2.1838 1.0253s-1.4398 0.78692-2.2427 0.84686c-0.27053 0.02019-0.54424-0.0029-0.80756-0.0681z"),
  path("m0.55147 16.399c-0.008516-0.0962-0.004885-0.19304 0-0.28949 0.14559-2.8748 1.4485-5.6729 3.5482-7.6418s4.9717-3.0889 7.8501-3.071c2.8784 0.017863 5.7329 1.171 7.8229 3.1503 2.09 1.9793 3.3957 4.763 3.5915 7.6348 0.01664 0.24408 0.02406 0.49787-0.06998 0.72372-0.05994 0.14396-0.1594 0.26997-0.27945 0.3695-0.12005 0.09953-0.2603 0.17318-0.40736 0.22507-0.29411 0.10378-0.6109 0.12091-0.92268 0.12916-2.8927 0.07653-5.7538-0.52529-8.6221-0.90795-2.8683-0.38267-5.8547-0.53626-8.5924 0.40135-0.73239 0.25083-1.464 0.58215-2.238 0.5669-0.387-0.0076-0.77883-0.10758-1.0957-0.32995-0.15842-0.11118-0.29663-0.25214-0.39917-0.41628s-0.16888-0.35162-0.18595-0.5444z"),
  path("m23.367 16.11c0.11244-3.0624-1.0714-6.1515-3.2017-8.3544s-5.1779-3.4896-8.2424-3.4799c-3.0644 0.0097215-6.1039 1.3158-8.2201 3.5321-2.1162 2.2164-3.2805 5.3129-3.1486 8.3745 0.010437 0.24231 0.028653 0.48474 0.06998 0.72372 0.10833 0.62646 0.37799 1.2243 0.77586 1.7202s0.92311 0.88868 1.5112 1.1302c0.5881 0.2415 1.2378 0.3312 1.8694 0.25806 0.63154-0.07314 1.2436-0.30895 1.7609-0.67848 0.51734-0.36953 0.93889-0.87198 1.2129-1.4457 0.27401-0.57368 0.39988-1.2174 0.36216-1.852-0.037719-0.63464-0.23895-1.2589-0.57898-1.7961-0.34003-0.53719-0.81813-0.98617-1.3756-1.2918z"),
  path("m21.259 17.894c0.41585 0.01738 0.69451-0.09641 0.9877-0.38444 0.54965-0.32312 0.58698-1.7646 0.65847-2.4028 0.13884-1.2159 0.0059-1.9071-0.41154-2.9794-0.97509-2.7261-2.2389-0.14588-3.7039-0.57666-0.68354-0.26605-0.55394-1.1975-0.82308-1.8261-0.31985-0.74696-1.9425-1.1746-2.5516-1.2494-1.1363-0.17764-2.1769 0.45739-3.1277 0.865-0.93787 0.5431-1.9748 1.225-3.1277 0.48055-1.1573-1.0968 0.23442-4.1044-1.7285-3.7483-3.8113 1.8776 0.97369 4.584-2.2223 4.5172-1.2468-0.91463-2.3575-2.3833-3.0454-3.6522-0.35453-0.33118-1.1755-0.23415-1.3992 0.28833-0.019428 1.8563 0.94482 3.504 1.4816 4.9978 0.41801 1.1715 0.97703 2.2655 1.3169 3.46z"),
  path("m17.744 16.843c0.84688 0.33168 1.735 0.65881 2.6406 0.5749 0.54651-0.05063 1.078-0.25447 1.5182-0.58226 0.44022-0.32779 0.78786-0.77857 0.99301-1.2876 0.20516-0.50907 0.26723-1.0749 0.17732-1.6164-0.08992-0.54144-0.33156-1.0569-0.69025-1.4723l-1.0705-4.743-3.283 3.3776-1.7842-5.3897-3.283 4.3118-0.71369-3.5932-2.6406 2.8027-1.5701-3.9525-2.4979 3.0901-1.927-2.9464 0.98241 8.9396c5.2048 3.0577 7.5275 0.28527 13.148 2.4866z"),
  path("m4.05 10.428c1.9847-1.4151 4.4519-2.0812 6.8895-2.0755 2.4376 0.00565 4.8465 0.65784 7.0579 1.6832 0.41091 0.19052 0.82216 0.39822 1.1532 0.70729 0.16554 0.15454 0.3095 0.33388 0.41218 0.53572s0.16328 0.42673 0.162 0.65319c-0.0017 0.29218-0.10421 0.57308-0.2022 0.84835-0.09799 0.27526-0.19396 0.55977-0.18167 0.8517 0.01105 0.26252 0.10902 0.51274 0.21009 0.75528 0.10107 0.24254 0.20772 0.48758 0.23776 0.74861 0.03621 0.31465-0.04158 0.63146-0.14445 0.93102-0.10288 0.29956-0.23172 0.59129-0.3034 0.8998-0.12834 0.55239-0.0578 1.1622 0.25592 1.6347 0.27186 0.40941 0.71857 0.69674 1.2027 0.78142 0.4841 0.08468 0.99904-0.03257 1.4029-0.31258 0.40388-0.28001 0.69324-0.71832 0.79917-1.1982 0.10592-0.4799 0.02896-0.99662-0.20582-1.4284-0.14752-0.27129-0.35223-0.5062-0.53807-0.75283-0.18584-0.24662-0.35722-0.51443-0.42161-0.81644-0.06746-0.3164-0.01226-0.64621 0.07183-0.9586s0.19717-0.61812 0.24807-0.9376c0.09454-0.5934-0.03299-1.2085-0.28907-1.7521-0.25608-0.54359-0.63553-1.0211-1.0545-1.4518-1.1988-1.2325-2.742-2.1106-4.3908-2.5983-1.6488-0.48763-3.4001-0.59192-5.108-0.39349-3.4157 0.39685-6.5944 1.975-9.4389 3.9072-0.16512 0.11216-0.33298 0.22908-0.44785 0.39232-0.10634 0.15111-0.16084 0.33456-0.17641 0.51868-0.015576 0.18412 0.00617 0.36962 0.041799 0.55092 0.071268 0.36261 0.19861 0.71861 0.19859 1.0882-1.47e-5 0.26765-0.067155 0.53041-0.14024 0.78788-0.07309 0.25747-0.15299 0.51508-0.17965 0.78139-0.040468 0.40431 0.043275 0.80924 0.11109 1.2099 0.06782 0.40063 0.11944 0.81625 0.016863 1.2094-0.066459 0.25472-0.19483 0.48829-0.29117 0.73327-0.048172 0.12249-0.088557 0.24873-0.10833 0.37886-0.019774 0.13013-0.018482 0.26463 0.015631 0.39176 0.033702 0.1256 0.099322 0.24221 0.1875 0.33779 0.088182 0.09557 0.19865 0.17011 0.31945 0.21826 0.2416 0.0963 0.52103 0.08356 0.76026-0.01847 0.23923-0.10203 0.43806-0.28933 0.57-0.51346 0.13195-0.22412 0.19882-0.48353 0.2101-0.74337 0.018723-0.43115-0.11053-0.85282-0.21145-1.2724-0.10092-0.41959-0.17351-0.86584-0.04446-1.2777 0.1055-0.33668 0.33544-0.6173 0.54954-0.89774 0.2141-0.28044 0.42314-0.58396 0.47412-0.93308 0.030017-0.20558 0.00284-0.41607-0.049679-0.61707-0.052519-0.20101-0.12994-0.39446-0.20242-0.58916s-0.14049-0.39246-0.17305-0.59765c-0.032553-0.20519-0.028293-0.41964 0.041273-0.61541 0.059786-0.16824 0.16581-0.31725 0.29044-0.4451 0.12463-0.12785 0.26794-0.23589 0.41332-0.33954z"),
  path("m16.632 11.782c-1.6833-0.86479-6.1957-0.26435-8.4513 0.03579-2.2556 0.30014-2.2556 0.30014-2.292 1.2559-0.03641 0.95578-0.10919 2.8662-0.39154 3.7571s-0.77292 0.76378-1.2642 0.63642c-0.7278-0.14556-2.1753-0.43505-2.1723-0.45421 0.00294-0.01916 2.3538-6.1676 3.2575-7.6603 0.90368-1.4927 10.905 0.25406 13.547 0.85279 2.6428 0.59873 2.1978 4.8428 1.4423 5.8793-0.75547 1.0365-2.0291 0.85459-2.8299 0.85498-0.80076 3.9e-4 -1.1283 0.18234-0.71857-0.89092 0.4097-1.0733 1.556-3.4022-0.12734-4.267z"),
  path("m3.7636 18.479c-0.82703 1.1919-2.0687 2.0834-3.1949 2.9181l14.318-2.2638s7.3245 1.2856 7.5712 0.82961c0.79596-1.4711-4.3267-7.976-3.4395-9.5801 0.72302-1.2476 0.64147-1.133 1.3967-2.3348 0.0051-0.0081 0.93909-1.4619 1.0328-1.6175 0.14017-0.23277 0.25838-0.48021 0.40187-0.71084l-17.865 9.4328s-0.022086 3.0397-0.22109 3.3264z"),
  path("m12.009 13.974c1.6448-0.59062 3.3738-1.123 5.1113-0.93592 0.86878 0.09354 1.7264 0.37317 2.4412 0.8758 0.71477 0.50263 1.2791 1.2367 1.5087 2.0798 0.08191 0.30076 0.12134 0.61157 0.19704 0.91396 0.0757 0.30238 0.19234 0.60336 0.40339 0.83277 0.18859 0.20499 0.4563 0.34491 0.73485 0.3459 0.13927 4.95e-4 0.27914-0.03367 0.40016-0.10261 0.12102-0.06894 0.22254-0.17299 0.2842-0.29787 0.06851-0.13878 0.08637-0.29919 0.06735-0.45278-0.01903-0.15359-0.07344-0.30107-0.14304-0.4393-0.13921-0.27646-0.33915-0.51962-0.47015-0.80006-0.19858-0.4251-0.22678-0.90896-0.21563-1.378 0.01115-0.46906 0.05816-0.94059-0.0027-1.4058-0.075621-0.5779-0.31882-1.1291-0.67178-1.5929-0.35296-0.46379-0.81336-0.8414-1.3235-1.1232-1.0203-0.56362-2.2153-0.73897-3.3809-0.72501s-2.3205 0.20643-3.4792 0.33355c-1.1587 0.12712-2.3416 0.18784-3.4809-0.058341-1.3229-0.28586-2.5243-0.97099-3.8178-1.3695-0.64674-0.19927-1.3231-0.32673-1.9987-0.28844-0.67565 0.038289-1.3528 0.25107-1.88 0.67543-0.51169 0.41191-0.86216 1.012-0.99827 1.6546-0.13611 0.64263-0.061943 1.3238 0.18194 1.9337 0.24388 0.60994 0.65366 1.1487 1.1575 1.5701 0.50387 0.42144 1.1 0.72723 1.728 0.92001 1.2559 0.38557 2.614 0.31831 3.8979 0.03949 1.2838-0.27882 2.5127-0.76128 3.7491-1.2053z"),
  path("m4.3762 14.83c-7.5184-9.1849 0.3968-6.1242 0.3968-6.1242l11.706 2.4059 5.8198 4.9577-0.46294 2.4788-18.253 2e-6z"),
  path("m2.4017 11.026c0.69566 0.2957 1.3037 0.80034 1.7076 1.4393 0.40389 0.63895 0.59922 1.4106 0.53041 2.1633-0.01168 0.12778-0.030734 0.25493-0.03733 0.38307-0.0066 0.12814-4.055e-4 0.25849 0.03733 0.38112 0.041115 0.13362 0.11905 0.25455 0.21726 0.35404 0.098217 0.09949 0.21633 0.1781 0.34215 0.23904 0.25164 0.1219 0.53057 0.17325 0.80522 0.22569 2.4069 0.45958 4.798 1.1 7.2473 1.1726 1.2247 0.03635 2.4603-0.07201 3.6377-0.41098 1.1774-0.33898 2.2965-0.91445 3.198-1.7442 0.22841-0.21023 0.44499-0.43812 0.70961-0.60044 0.29166-0.1789 0.62903-0.27019 0.92795-0.43668 0.55403-0.30859 0.94864-0.87593 1.0791-1.4965 0.13051-0.6206 0.0041-1.2851-0.31495-1.8332-0.35532-0.61029-0.95336-1.0806-1.6376-1.2555-0.5725-0.14632-1.1778-0.088284-1.7577 0.025457-0.57985 0.11374-1.1496 0.28216-1.7358 0.35664-1.4446 0.18354-2.9043-0.21388-4.2492-0.77245-1.3449-0.55856-2.6194-1.2804-3.9813-1.796-1.3619-0.51565-2.8563-0.82031-4.277-0.5004-0.71034 0.15996-1.3904 0.47811-1.9378 0.95828s-0.9568 1.1261-1.1115 1.8376c-0.044196 0.20322-0.067766 0.4143-0.031701 0.61912 0.036064 0.20482 0.1371 0.40394 0.30463 0.52717 0.098572 0.07251 0.2149 0.11589 0.32751 0.16376z"),
]

export default (id) => svg(viewBox, { key: id, class: "trendsWig", "aria-label": id }, icons[id])
