import {
  Body,
  Button,
  Container,
  Column,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";
import * as React from "react";



export const Email = () => {

  const previewText = `Join on ticketeer`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans px-2">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[600px]">
            {/* <Section className="mt-[32px]">
              <Img
                src={`${baseUrl}/static/vercel-logo.png`}
                width="40"
                height="37"
                alt="Vercel"
                className="my-0 mx-auto"
              />
            </Section> */}
            <Heading className="text-black text-[24px] font-bold text-center p-0 my-[30px] mx-auto">
              <span className="text-center font-serif">Ticketpro</span>
            </Heading>
            <Img
              src={`https://ci3.googleusercontent.com/meips/ADKq_Nb50Ng7GaBS-9VFoJxaYY2nIBmpK5HgB6gdLI3BnfwZs6WpJQgj8sRSMCcugXae7d3sohknqYisEJMbopubLQ7l5bUdt0sOpSVj7mip0mVT1QgQiidKgAG-7miJyWMw1uQXKMMn7pvHXhZRYbsuImfIAn3fGx7ARgiNtxkjyn4VUDuT4w=s0-d-e1-ft#https://image.mailing.ticketmaster.com/lib/fe3411727664047e7c1772/m/1/96b64f22-b224-463e-ad1c-31f5dfeb6413.jpg`}
              width="500"
              height="auto"
              alt="Vercel"
              className="my-0 mx-auto"
            />
            <Text className="text-black text-[14px] leading-[24px] text-center">
              <strong>Here is your ticket</strong>
            </Text>
            <Section>
              <Row>
                <Column align="center">
                  <Img
                    src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSP_8PJ7AX8iQjx23L6ZMvttHrcb1n9UbAAq7l7qDyRrw&s`}
                    width="150"
                    height="auto"
                    alt="invited you to"
                  />
                </Column>
              </Row>
            </Section>
            <Section className="text-center mt-[32px] mb-[32px]">
              
            </Section>
            <Text className="text-black text-[14px] leading-[24px]">
              or copy and paste this URL into your browser:{" "}
              
            </Text>
            <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              This invitation was intended for{" "}
               If you
              were not expecting this invitation, you can ignore this email. If
              you are concerned about your account's safety, please reply to
              this email to get in touch with us.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};
