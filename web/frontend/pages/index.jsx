// import {
//   Card,
//   Page,
//   Layout,
//   TextContainer,
//   Image,
//   Stack,
//   Link,
//   Text,
// } from "@shopify/polaris";
// import { TitleBar } from "@shopify/app-bridge-react";
// import { useTranslation, Trans } from "react-i18next";

// import { trophyImage } from "../assets";

// import { ProductsCard } from "../components";

// export default function HomePage() {
//   const { t } = useTranslation();
//   return (
//     <Page narrowWidth>
//       <TitleBar title={t("HomePage.title")} primaryAction={null} />
//       <Layout>
//         <Layout.Section>
//           <Card sectioned>
//             <Stack
//               wrap={false}
//               spacing="extraTight"
//               distribution="trailing"
//               alignment="center"
//             >
//               <Stack.Item fill>
//                 <TextContainer spacing="loose">
//                   <Text as="h2" variant="headingMd">
//                     {t("HomePage.heading")}
//                   </Text>
//                   <p>
//                     <Trans
//                       i18nKey="HomePage.yourAppIsReadyToExplore"
//                       components={{
//                         PolarisLink: (
//                           <Link url="https://polaris.shopify.com/" external />
//                         ),
//                         AdminApiLink: (
//                           <Link
//                             url="https://shopify.dev/api/admin-graphql"
//                             external
//                           />
//                         ),
//                         AppBridgeLink: (
//                           <Link
//                             url="https://shopify.dev/apps/tools/app-bridge"
//                             external
//                           />
//                         ),
//                       }}
//                     />
//                   </p>
//                   <p>{t("HomePage.startPopulatingYourApp")}</p>
//                   <p>
//                     <Trans
//                       i18nKey="HomePage.learnMore"
//                       components={{
//                         ShopifyTutorialLink: (
//                           <Link
//                             url="https://shopify.dev/apps/getting-started/add-functionality"
//                             external
//                           />
//                         ),
//                       }}
//                     />
//                   </p>
//                 </TextContainer>
//               </Stack.Item>
//               <Stack.Item>
//                 <div style={{ padding: "0 20px" }}>
//                   <Image
//                     source={trophyImage}
//                     alt={t("HomePage.trophyAltText")}
//                     width={120}
//                   />
//                 </div>
//               </Stack.Item>
//             </Stack>
//           </Card>
//         </Layout.Section>
//         <Layout.Section>
//           <ProductsCard />
//         </Layout.Section>
//       </Layout>
//     </Page>
//   );
// }
import { useNavigate, TitleBar, Loading } from "@shopify/app-bridge-react";

import{
  Card,
  EmptyState,
  Layout,
  Page,
  SkeletonBodyText,
} from "@shopify/polaris";

export default function HomePage() {
  // This modifies top-level browser url so
  // that app can navigate within the top-level browser
  // in sync on reload
  const navigate = useNavigate();
  /* These are mock values. setting these values let 
  you preview the loading markup and the empty state.
  */

//  const isLoading = true;
  const isLoading = false;
 const isRefreshing = false;
 const QRCodes = [];

 /*loading Markup uses the loading component from 
 AppBridge and components from Polaris*/
 const loadingMarkup = isLoading ? (
  <Card sectioned>
    <Loading />
    <SkeletonBodyText /> 
  </Card>
 ) : null;

//  Use Polaris Card and EmptyStatecomponent to define
//  the contents of the empty state
const emptyStateMarkup =
!isLoading && !QRCodes?.length ? (
  <Card sectioned>
    <EmptyState 
      heading="Create unique Qrcodes for your product"
      // This button will take the user to a Create a QR code page */
      action={{ 
        content: "Create QR code",
        onAction: () => navigate("/qrcodes/new"),
      }}
      image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
     >
      <p>
        Allow customers to scan codes and buy products using their phones.
      </p>
     </EmptyState>
  </Card>
)  : null;
/*
    Use Polaris Page and TitleBar components to create the page layout,
    and include the empty state contents set above.
*/
return(
  <Page>
    <TitleBar
      title="QR codes"
      primaryAction={{ 
        content: "Create QR code",
        onAction: () => navigate("/qrcodes/new"),
       }}
    />
    <Layout>
      <Layout.Section>
        {loadingMarkup}
        {emptyStateMarkup}
      </Layout.Section>
    </Layout>
       
  </Page>
);

}