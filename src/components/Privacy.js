import React from "react";
import { Link } from "react-router-dom";

const Privacy = () => (
  <div className="privacy">
    <h2>Privacy</h2>
    <h3>What we collect and why</h3>
    <p>
      Our guiding principle is to collect only what we need. Here’s what that
      means in practice:
    </p>
    <h4>Identity & access</h4>
    <p>
      When you sign up for a Basecamp product, we typically ask for identifying
      information such as your name, email address, and maybe a company name.
      That’s just so you can personalize your new account, and we can send you
      invoices, updates, or other essential information. We sometimes also give
      you the option to add a profile picture that displays in our products, but
      we do not normally look at or access that picture. We’ll never sell your
      personal info to third parties, and we won’t use your name or company in
      marketing statements without your permission either.
    </p>
    <h4>Geolocation data</h4>
    <p>
      We log all access to all accounts by full IP address so that we can always
      verify no unauthorized access has happened. We keep this login data for as
      long as your product account is active.
    </p>
    <p>
      We also log full IP addresses used to sign up a product account. We keep
      this record forever because they are used to mitigate spammy signups.
    </p>

    <h4>Website interactions</h4>
    <p>
      When you browse our marketing pages or applications, your browser
      automatically shares certain information such as which operating system
      and browser version you are using. We track that information, along with
      the pages you are visiting, page load timing, and which website referred
      you for statistical purposes like conversion rates and to test new
      designs. We sometimes track specific link clicks to help inform some
      design decisions. These web analytics data are tied to your IP address and
      user account if applicable and you are signed into our Services. We blind
      all of these individual identifiers after 30 days.
    </p>
    <p>
      Historically — including within the last 12 months — we have used
      third-party web analytics software. We no longer do for our actively sold
      and developed products and their marketing sites (Basecamp and HEY). We
      are in the process of removing third party web analytics software from our
      other products and web properties.
    </p>
    <h4>Cookies and Do Not Track</h4>
    <p>
      We do use persistent first-party cookies to store certain preferences,
      make it easier for you to use our applications, and support some in-house
      analytics. A cookie is a piece of text stored by your browser to help it
      remember your login information, site preferences, and more. You can
      adjust cookie retention settings in your own browser. To learn more about
      cookies, including how to view which cookies have been set and how to
      manage and delete them, please visit: www.allaboutcookies.org.
    </p>
    <p>
      At this time, our sites and applications do not respond to Do Not Track
      beacons sent by browser plugins.
    </p>
    <h4>Voluntary correspondence</h4>
    <p>
      When you write Basecamp with a question or to ask for help, we keep that
      correspondence, including the email address, so that we have a history of
      past correspondences to reference if you reach out in the future.
    </p>
    <p>
      We also store any information you volunteer like surveys. Sometimes when
      we do customer interviews, we may ask for your permission to record the
      conversation for future reference or use. We only do so if you give your
      express consent.
    </p>
    <h4>Information we do not collect</h4>
    <p>
      We don’t collect any characteristics of protected classifications
      including age, race, gender, religion, sexual orientation, gender
      identity, gender expression, or physical and mental abilities or
      disabilities. You may provide these data voluntarily, such as if you
      include a pronoun preference in your email signature when writing into our
      Support team.
    </p>
    <p>
      We also do not collect any biometric data. You are given the option to add
      a picture to your user profile, which could be a real picture of you or a
      picture of something else that represents you best. We do not extract any
      information from profile pictures: they are for your use alone.
    </p>

    <h4>Location of Site and Data</h4>
    <p>
      This Application is operated in  Europe. If you are located in the
      United States or elsewhere outside of Europe, please be aware that any
      information you provide to us will be transferred to Europe. By using our
      site, participating in any of our services and/or providing us with your
      information, you consent to this transfer.
    </p>
    <h4>How we secure your data</h4>
    <p>
      When you deactivate your account, we’ll ensure that nothing is stored on
      our servers immediately. Anything you delete on your account while it’s
      active will also be purged immediately. We do not have backups of our
      application databases, but if we do in the future, they are kept for up to
      30 days. Retrieving data for a single account from a backup is
      cost-prohibitive and unduly burdensome so if you change your mind you’ll
      need to do so before your data are deleted from our active servers.
    </p>
    <h4>Changes & questions</h4>
    <p>
      Tasksy may update this policy once in a blue moon — we’ll notify you about
      significant changes by emailing the account owner or by placing a
      prominent notice on our site. You can access, change or delete your
      personal information at any time in settings.
    </p>

    <p>Questions about this privacy policy? Please <Link to="/contact">get in touch</Link> and we’ll be happy to answer them!</p>
    <p><small> Adapted from <a href="https://github.com/basecamp/policies">the Basecamp open-source policies / CC BY 4.0</a></small></p>
  </div>
);

export default Privacy;