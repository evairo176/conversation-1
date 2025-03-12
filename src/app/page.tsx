import { redirect } from 'next/navigation';

type Props = {};

const Page = (props: Props) => {
  return redirect('/login');
};

export default Page;
