import React from "react";
import styles from "./page.module.css";
import Image from "next/image";
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
          The Event Explorer is a web app I helped develop at AuroraX, which
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

      <section className={styles.section}>
        <h1 className={styles.title}>Alpha Version (Before)</h1>
        <p className={styles.description}>
          As part of my time at AuroraX I added several capabilities to the
          Event Explorer to make it a product that physicists would love to use.
          These new features allow you to click on site locations and display
          associated keograms, adding 8 new datasets for data, completely
          overhauling the UI, adding colormaps and altitude controls, and so on.
          Here's what the event explorer looked like before my redesigns and
          feature additions:
        </p>{" "}
        <div className={styles["video-container"]}>
          <Image
            src="/before.png"
            alt="Dashboard Image"
            layout="responsive"
            width={2880}
            height={1384}
            priority
          ></Image>
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
        <br />
        <br />
        <p className={styles.description}>
          Since the data is ultimately camera data, and certain cameras apply
          different color maps when imaging (TREx RGB is full RGB, NIR is
          grayscale) I added the ability for physicists to specify which
          colormaps they wanted to use (utilizing MATLAB color maps to transform
          array data).
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
