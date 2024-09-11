import React from "react";
import styles from "./page.module.css";
export const metadata = {
  title: "Event Explorer",
};

export default function EventExplorer() {
  return (
    <main className={styles.main}>
      {/* Main Header with Video */}
      <section className={styles.section}>
        <h1 className={styles.title}>Event Explorer: Demo</h1>
        <p className={styles.description}>
          The Event Explorer is a web app I developed at AuroraX, which
          physicists use to investigate and explore auroral data, as well as
          conduct simulations. It allows for the visualization of camera and
          thermal data from both satellite and ground instruments, along with
          the capability to model the locations of various satellites in orbit
          (such as Swarm or THEMIS satellites).
        </p>
        <div className={styles["video-container"]}>
          <video className={styles.video} autoPlay muted loop>
            <source src="/homepage.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </section>

      {/* Dataset and Satellite Controls Section */}
      <section className={styles.section}>
        <h2 className={styles.subtitle}>
          Satellite and Ground Instrument Controls
        </h2>
        <p className={styles.description}>
          Users can control the datasets displayed in the Event Explorer,
          specify the satellites and associated paths they want to visualize
          (such as NB or SB), and display keograms (a way of visualizing auroral
          data) associated with each ground instrument/satellite.
        </p>
        <div className={styles["video-container"]}>
          <video className={styles.video} autoPlay muted loop>
            <source src="/livedemo.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </section>

      {/* Dataset and Altitude Controls Section */}
      <section className={styles.section}>
        <h2 className={styles.subtitle}>Dataset Controls</h2>
        <p className={styles.description}>
          The Event Explorer provides fine-grained control over datasets, as
          well as transformation controls for altitude. Users can easily adjust
          settings to visualize data however they wish. Color maps allow users
          to customize the appearance of displayed auroral data, and a Bézier
          widget enables users to control the visual altitude of the associated
          data.
        </p>
        <div className={styles["video-container"]}>
          <video className={styles.video} autoPlay muted loop>
            <source src="/bezier.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </section>
    </main>
  );
}
