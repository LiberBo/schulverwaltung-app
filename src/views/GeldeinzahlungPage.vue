<template>
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-title>Geldeinzahlung</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content :fullscreen="true">

        <h1 color="primary" id="Kontostandsanzeige">Wie möchten Sie Geld einzahlen?</h1>
  
        <ul id="ButtonList">
          <li><table border="0" cellpadding="10" cellspacing="0" align="center"><tbody><tr><td align="center"></td></tr><tr><td align="center"><a href="https://ad.doubleclick.net/ddm/trackclk/N426203.3410571DEPAYPALLOGOCENTE/B21619412.227908863;dc_trk_aid=425874235;dc_trk_cid=105302987;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=" title="So funktioniert PayPal" onclick="javascript:window.open('https://ad.doubleclick.net/ddm/trackclk/N426203.3410571DEPAYPALLOGOCENTE/B21619412.227908863;dc_trk_aid=425874235;dc_trk_cid=105302987;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=','WIPaypal','toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=yes, width=715, height=539); return false;"><img src="https://www.paypalobjects.com/digitalassets/c/EMEA/landing_page/landing-pages/paypal_register_now_cta_200px.png" border="0" alt="PayPal Logo" /></a></td></tr></tbody></table></li>
         <li id="Button1"><ion-button>Überweisung</ion-button> </li>
         <li id="Button1"><ion-button>SEPA-Lastschrift</ion-button></li>
         <li id="Button2"><ion-button href="/tabs/Wallet">Zurück zur Wallet</ion-button></li>
        </ul>
  
        
        
      </ion-content>
    </ion-page>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
  
  export default  defineComponent({
    name: 'GeldeinzahlungPage',
    components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage }
  });
  </script>
  
  <style>
  
  ion-content {
    text-align: center; 
  }

  #ButtonList{
    padding-top: 1%;
    list-style-type: none;
  }

  #Button1{
    padding-top: 5%
  }

  #Button2{
    padding-top: 20%
  }
  
  
  
  
  </style>