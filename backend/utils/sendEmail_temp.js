// ... keep all the imports and setup the same ...

  try {
    console.log('📧 Attempting to send email to:', to);
    console.log('📧 Subject:', subject);
    console.log('📧 From:', process.env.EMAIL_USER);
    
    const info = await transporter.sendMail({
      from: `"Quantyrex Markets" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html
    });
    
    console.log('✅ Email sent successfully!');
    console.log('📬 Message ID:', info.messageId);
    console.log('📬 Response:', info.response);
    
    return { success: true };
  } catch (error) {
    console.error('❌ Email error:', error.message);
    console.error('Error code:', error.code);
    console.error('Full error:', error);
    return { success: false, error: error.message };
  }
};
