import styles from './page.module.scss';

const Dashboard = () => {
    return (
        <main className={styles.page}>
            <h1>Dashboard</h1>
            <div className={styles.spotlight}>
                <h2>Spotlight</h2>
                <div className={styles.spotlightElements}>
                    <div className={styles.spotlightElement}>
                        <h3>API</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore porro sint iure accusamus numquam maiores praesentium, error sequi eum exercitationem aspernatur provident quasi dolorum perferendis quos adipisci corrupti aperiam assumenda?</p>
                    </div>
                    <div className={styles.spotlightElement}>
                        <h3>Demographic Data</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore porro sint iure accusamus numquam maiores praesentium, error sequi eum exercitationem aspernatur provident quasi dolorum perferendis quos adipisci corrupti aperiam assumenda?</p>
                    </div>
                </div>
            </div>
            <div className={styles.services}>
                <h2>Services</h2>
                <div></div> 
            </div>
        </main>
    );
}

export default Dashboard;