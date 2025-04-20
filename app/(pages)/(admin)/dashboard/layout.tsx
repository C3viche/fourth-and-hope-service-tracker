import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';

import styles from './layout.module.scss'
import GeminiBox from '@/app/(components)/gemini-box/gemini-box';

const Dashboardlayout = async({ children }: { children: React.ReactNode }) => {
  const supabase = await createClient(); // already scoped to the current request

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
console.log("HI");
  if (userError || !user) {
    return redirect('/login');
  }

  const {
    data: roleData,
    error: roleError,
  } = await supabase
    .from('Roles')
    .select('role')
    .eq('user_id', user.id)
    .maybeSingle();
  console.log(roleData);
  console.log("HELLO");
  if (roleError || roleData?.role !== 'admin') {
    return redirect('/unauthorized');
  }


  // THIS IS HOW YOU FETCH LOGS !!!!
  const {
    data: logs,
    error: logsError
  } = await supabase // supabase query returns data, and error if it went wrong
    .from('Log')
    .select('*');

  if (logsError) {
    console.error('Failed to fetch logs:', logsError);
  }

  // Can use the client_id from logs to search in clients:
  const clientIds = Array.from(new Set(logs?.map(log => log.client_id)));

  const { data: clients, error: clientError } = await supabase
    .from('Client')
    .select('*')
    .in('id', clientIds); // use `.in` to match multiple IDs
  if (clientError) {
    console.log(clientError);
  }
  // Now can map logs to client demographics
  const clientMap = new Map(clients?.map(client => [client.id, client]));

  const logsWithClientInfo = logs?.map(log => ({
    ...log,
    client: clientMap.get(log.client_id), // adds full client info to each log
  }));

  // Sorting it
  const sortedLogs = logsWithClientInfo?.toSorted((a, b) =>
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // if you want to count logs by age group, gender, etc., you can access log.client.age, log.client.gender, etc.
  const filteredLogs = logsWithClientInfo?.filter(log => log.client.ethnicity === 'Chinese');

  return (
    <main className={styles.page}>

        <h1>Dashboard</h1>
        <div className={styles.spotlight}>
            <h2>Spotlight</h2>
            <div className={styles.spotlightElements}>
              <div className={styles.spotlightElement}>
                <GeminiBox/>
              </div>
              <div className={styles.spotlightElement}>
                  <h3>Demographic Data</h3>
                  {/* I just printed the logs here but you can take this and input to charts! */}
                  <h3>All Logs</h3>
                      <ul>
                      {logsWithClientInfo?.map(log => (
                          <li key={log.id}>
                          {log.client
                              ? <>Age_group: {log.client.age_group}, Sex: {log.client.sex}</>
                              : <>No client info found for ID: {log.client_id}</>
                          }
                          </li>
                      ))}
                      </ul>

                      <h3>Sorted Logs (Newest First)</h3>
                      <ul>
                      {sortedLogs?.map(log => (
                          <li key={log.id}>
                          {/* you kind of have to alternate between log.client. or just log. */}
                          {log.client.name} : {log.service} - {log.date} 
                          </li>
                      ))}
                      </ul>

                      <h3>Filtered Logs (Filter logs by Chinese)</h3>
                      <ul>
                      {filteredLogs?.map(log => (
                          <li key={log.id}>
                          {log.client.name} : {log.service} - {log.date}
                          </li>
                      ))}
                      </ul>

                  {/* <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore porro sint iure accusamus numquam maiores praesentium, error sequi eum exercitationem aspernatur provident quasi dolorum perferendis quos adipisci corrupti aperiam assumenda?</p> */}
              </div>
            </div>
        </div>

      {/* Let page.tsx handle tabs and content now */}
      <div className={styles.services}>
        <h2>Services</h2>
        <div className={styles.tabs}>
        {children}
        </div>
      </div>
    </main>
  );
}

export default Dashboardlayout;