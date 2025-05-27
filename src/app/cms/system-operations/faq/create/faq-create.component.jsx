import { CommonLayout } from "@/features/layouts";
import { LinkButton } from "@/features/ui";
import { FaqCreateForm } from "./create-form.component";
import { useParams } from "react-router-dom";

export const FaqCreate = () => {
    const params = useParams();
    const Title = params?.id ? "Update FAQ" :"Create FAQ";
    const breadCrumbsItem = [{ name: "Faq",url:"/faq"}, { name: params.id ? "Faq update" : "Faq create" }];
  return (
    <CommonLayout
      title={Title}
      breadcrumbItems={breadCrumbsItem}
      BtnComp={<LinkButton to="/faq" btnName="Back" />}
    >
      <FaqCreateForm id={params?.id}/>
    </CommonLayout>
  );
};
