import Comment from "@/components/Comment/page";
import DescriptionUser from "@/components/DescriptionUser/page";
import SocialNetworks from "@/components/SocialNetworks/page";
import UserProfil from "@/components/UserProfil/page";
import { getUserById } from "@/utils/users";
import Activity from "./Activity";

export default async function Home({ params }: { params: { id: string } }) {
  const user = await getUserById(params.id);

  return (
    <section className="bg-gray-100">
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
          <article className="col-span-4 sm:col-span-3">
            <div className="bg-white shadow rounded-lg p-6">
              <UserProfil
                userName={user?.username}
                imgUrl={user?.imageProfile}
                subtitle={`${user?.firstName} ${user?.lastName}`}
              />
              <hr className="my-6 border-t border-gray-300" />
              <DescriptionUser
                title="General info"
                description={user?.description || ""}
              />
              <hr className="my-6 border-t border-gray-300" />
              {user?.socialNetworks ? (
                <SocialNetworks listSocialNetworks={user?.socialNetworks} />
              ) : null}
            </div>
          </article>

          <article className="col-span-4 sm:col-span-9">
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-bold  mb-4">Activity History</h2>
              <hr className="my-6 border-t border-gray-300" />
              <Activity />
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
