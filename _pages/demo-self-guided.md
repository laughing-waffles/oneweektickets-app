---
title:						Demo
description:			A self-guided demo of OneWeek Tickets
layout:						default
sitemap:          false
steps:
  - title: Welcome
    text: |
      Thank you for taking time to participate in the OneWeek Tickets self-exploration demo! Your feedback is highly valuable to us as we prepare to launch this new and innovative approach to selling event tickets.

      We are eager to tell you all about our company, our background, and the problems we are trying to solve in the modern era of online event selling and buying, but telling you too much before you take this demo would bias your feedback. Therefor, please run through the demo first, writing down your feedback and thoughts along the way, and then at the end, we will tell you what our goal was and you can help us understand if you think we are on the right track or not.          
  - title: Tips for taking the demo
    text: |
      We need your feedback for how we can improve! Help us understand what you like and what you don't like. We need to know it all: the good, the bad, and the ugly. 

      You can use a voice or screen recording app to capture your thoughts, or you can type notes into our [feedback form](https://docs.google.com/forms/d/e/1FAIpQLSeDPsLOvDszweFjJk4ugbHJYWyrWec_LIjpQeQclQzS8Ty5uw/viewform){:target="_blank"} or even just email us at [feedback@oneweektickets.com](mailto:feedback@oneweektickets.com){:target="_blank"}.

      With that, let's get on with the demo!
  - title: Scenario
    text: |
      The end of the pandemic is in-sight and you are eager for some live entertainment! Today, you will be looking to purchase tickets for yourself and a friend to see the popular German rock band, Rammstein. You want to see them on May 20, 2022 in the city of Leipzig (Germany) at the Red Bull Arena. Have fun!
  - title: Tour announcement 
    text: |
      You have received an email announcement from Rammstein with their 2022 tour dates. Find the date you want to attend and click the link to continue. Reminder: You are looking for May 20, 2022 in the city of Leipzig (Germany) at the Red Bull Arena.

      [Click here to read the email](https://www.oneweektickets.com/demo/){:target="_blank"}
  - title: On the event details page
    text: |
      Describe what you see and what you understand about buying these tickets. How does that make you feel? Confused? Excited? Stressed? Let us know everything racing through your mind.
  - title: Submit bids on a pair of tickets
    text: |
      You'll be asked to create an account and provide payment information. You can use your own email address or this test email address. If you use your own, we will delete it after the test.
      
      * **Email:** test@oneweektickets.com
      * **Password:** Password1!
      
      For payment, use this card information: 
      
      * **Email:** the same email address
      * **Number:** 4242 4242 4242 4242 
      * **Expire:** 12/34 
      * **CVC:** 123 
      * **Name on card:** test 
      * **Country:** any
  - title: After submitting payment
    text: |
      After submitting payment, what do you understand about the next screen? How can it be better? Does any of this information surprise you, considering what you learned on the event details screen? Click continue.
  - title: Profile page
    text: |
      You are now on your account profile page. Don't click anything yet, just let us know what you think about it.
  - title: It is now the next morning...
    text: |
      Now it's the next morning and you've got mail! What do you understand about this email? How could it be better? 

      [Click here to read the email](https://www.oneweektickets.com/demo-email-bid-lost/){:target="_blank"}

      While reading the email, you decide you want to change your bid to a different price, and while you're at it, buy an extra ticket. Talk through how you do that (and do it).
  - title: It is now the next morning (again)...
    text: |
      Now it's the next morning and you've got mail (again)! What do you understand about this email? How could it be better?

      [Click here to read the email](https://www.oneweektickets.com/demo-email-bid-won/){:target="_blank"}
  - title: But let's pretend... 
    text: |
      Let's pretend that you didn't win tickets yet (forget about that last email) and you've decided that you don't want to attend this event. What would you do now? How can this be better?

      [Open your profile page to do start this step](https://www.oneweektickets.com/u/account-settings/profile/){:target="_blank"}
  - title: Last step
    text: |
      Logout of OneWeek Tickets.
  - title: Conclusion
    text: |
      Our aim is to help ticket sellers with the difficult task of price-discovery (ie: knowing how much they should sell their product for). Our approach ensures that seller's can maximize their revenues, but not at the expense of ticket buyers. By utilizing the 7-day rolling auction design, we help buyers buy tickets at a fair price, while maximizing revenues for the seller. Simultanious to this, we also squeeze out any potential profit margins for the secondary-market, which exploits under-priced tickets by buying low and selling them at a huge markup to real fans. 

      You can visit our homepage to learn more about what we offer to ticket sellers. 

      [https://www.oneweektickets.com](https://www.oneweektickets.com){:target="_blank"}

      Given what you know now, how do you feel? Is our approach valid? As an events ticket buyer, would you engage in such a service? 

      Again, your feedback is very important to us. Please submit [this feedback form](https://docs.google.com/forms/d/e/1FAIpQLSeDPsLOvDszweFjJk4ugbHJYWyrWec_LIjpQeQclQzS8Ty5uw/viewform){:target="_blank"} or send us an email with your thoughts to [feedback@oneweektickets.com](mailto:feedback@oneweektickets.com){:target="_blank"}. 

      THANK YOU!
  - title: The demo over
    text: |
      You can close this window.
---

<div class="d-flex align-items-center">
  <div class="container">
    <div class="row">
      <div class="offset-lg-2 col-lg-8 col-12">
        <div class="p-4 p-lg-8">
          <div class="card">
            <div class="card-header">
              <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                <button type="button" class="btn btn-primary me-md-2" data-bs-target="#carouselDemo" data-bs-slide="prev">Previous</button>
                <button type="button" class="btn btn-primary" data-bs-target="#carouselDemo" data-bs-slide="next">Next</button>
              </div>
            </div>
            <div class="card-body">
              <div id="carouselDemo" class="carousel slide" data-bs-ride="carousel" data-bs-interval="false">
                <div class="carousel-inner">
                  {% for step in page.steps %}
                  <div class="carousel-item min-vh-40{% if forloop.first == true %} active{% endif %}">
                    <h3>{{ step.title | markdownify }}</h3>
                    {{ step.text | markdownify }}
                  </div>
                  {% endfor %}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>