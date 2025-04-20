import AddUsersLayout from '../../../(components)/add-client/AddUsersLayout';
import UserCard from '../../../(components)/add-client/UserCard';
import Sidebar from '@/app/(components)/sidebar/sidebar';
const dummyUsers = [
    {
      id: 1,
      name: "Jane Doe",
      pronunciation: "Jay-n Doh",
      age_group: "18-39",
      sex: "Female",
      ethnicity: "Hispanic",
      language: "Spanish",
      stay_type: "overnight",
      notes: "Requires medication every morning.",
      date_added: new Date("2024-12-12"),
    },
    {
        id: 1,
        name: "Joseph Doe",
        pronunciation: "Jay-n Doh",
        age_group: "18-39",
        sex: "Female",
        ethnicity: "Hispanic",
        language: "Spanish",
        stay_type: "overnight",
        notes: "Requires medication every morning.",
        date_added: new Date("2024-12-12"),
      },{
        id: 1,
        name: "Janie Doe",
        pronunciation: "Jay-n Doh",
        age_group: "18-39",
        sex: "Female",
        ethnicity: "Hispanic",
        language: "Spanish",
        stay_type: "overnight",
        notes: "Requires medication every morning.",
        date_added: new Date("2024-12-12"),
      },{
        id: 1,
        name: "Jacob Doe",
        pronunciation: "Jay-n Doh",
        age_group: "18-39",
        sex: "Female",
        ethnicity: "Hispanic",
        language: "Spanish",
        stay_type: "overnight",
        notes: "Requires medication every morning.",
        date_added: new Date("2024-12-12"),
      },
  ];

export default function AddUsersPage() {
  return (
    // <div>
    // 
<AddUsersLayout>
  <UserCard isAddButton />
  {dummyUsers.map((user, i) => (
    <UserCard key={user.id} user={user} />
  ))}
</AddUsersLayout>
    // </div>
  );
}

