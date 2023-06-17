import Upload from "../../../../artifacts/contracts/Upload.sol/Upload.json";
import {Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AddResultService } from 'src/app/Service/Teacher/add-result.service';
import { Results } from 'src/app/modal/results';
import { Student } from 'src/app/modal/student';
import { ToastrService } from 'ngx-toastr';
import {ethers} from 'ethers'
import axios from 'axios';

declare var window: any

@Component({
  selector: 'app-addresults',
  templateUrl: './addresults.component.html',
  styleUrls: ['./addresults.component.css']
})
export class AddresultsComponent implements OnInit{
  
  selectedFiles?: FileList;
  dateVariable:string = ''
  certName:string=''
  certDescription:string = ''
  currentUserId:string | undefined | null
  currentUserRole:string | null = ''
  percentage = 0;
  eventDate:Date | undefined
  student:Student | undefined

  account: any | undefined;
  contract: any | null = null;
  provider: ethers.providers.Web3Provider | null = null;

  constructor(private router: Router,private ngxLoader:NgxUiLoaderService, private addResult:AddResultService,private ToastrService: ToastrService){
    console.log("I am sanjay")
    const state = this.router.getCurrentNavigation()?.extras.state;
    console.log("Current State is " + state)
    if(state)
      this.student = state['studentDetails']
    console.log(this.student)
  }
  ngOnInit(): void {
    this.currentUserId = localStorage.getItem("UserId")
    try {
      this.provider = new ethers.providers.Web3Provider(window.ethereum);
      const loadProvider = async () => {
        if (this.provider) {
          window.ethereum.on("chainChanged", () => {
            window.location.reload();
          });
  
          window.ethereum.on("accountsChanged", () => {
            window.location.reload();
          });
          await this.provider.send("eth_requestAccounts", []);
          const signer = this.provider.getSigner();
          const address = await signer.getAddress();
          this.account = address;
          let contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
          console.log(Upload.contractName)
          const contract = new ethers.Contract(
            contractAddress,
            Upload.abi,
            signer
          );
          //console.log(contract);
          this.contract = contract
          this.provider = this.provider
        } else {
          console.error("Metamask is not installed");
        }
      };
      this.provider && loadProvider();
    } catch (error) {
      console.error('Metamask is not installed');
    }
  }
  async OnResetedForm(){
    console.log("start reseting")
    this.selectedFiles = undefined
    this.certName = ""
    this.certDescription = ""
    this.dateVariable = ""
    console.log("end reseting")
  }

  OnAdded(){
    this.ngxLoader.start()
    this.eventDate = new Date(this.dateVariable)
    const file : File | null | undefined = this.selectedFiles?.item(0)
    if(this.certName == "" || this.certDescription == "" || this.dateVariable == "" || file == null || file == undefined){
      this.ngxLoader.stop()
      alert("Fill all the fields")
      return;
    }

    const resultObj :Results = {
      SenderUid : this.currentUserId!=null? this.currentUserId : "",
      SenderRole: "Teacher",
      CertificateName :  this.certName,
      CertificateDescription :  this.certDescription,
      Attachements :  "",
      ConductedDate:this.eventDate,
    }

    this.addResult.pushFileToStorage(file,resultObj,this.student?.uid??"").subscribe((progress:number | undefined)=>{
      this.percentage = Math.round(progress? progress:0)
        if(this.percentage == 100){
          
          this.uploadFile()
          
        }
    },err=>{
      this.OnResetedForm()
      this.ngxLoader.stop()
      this.ToastrService.error("Unable to Update the Event Details")
    })

  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  uploadFile(){
    console.log(this.selectedFiles?.item(0))
    if(this.account != undefined){
      try {
        const fileToUpload = this.selectedFiles?.item(0)
        if(fileToUpload == null || fileToUpload == undefined)return;
        const data = new FormData()
        data.append("file",fileToUpload)
        axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: data,
          headers: {
            pinata_api_key: `40399ecd458ff74126a5`,
            pinata_secret_api_key: `62bd1085e84b71dded1fc8bbc10fb3ed20c15b881b918e1d7d4e48cb7067e545`,
            "Content-Type": "multipart/form-data",
          },
        }).then((uploadRes)=>{
          const ImgHash = `https://gateway.pinata.cloud/ipfs/${uploadRes.data.IpfsHash}`;
          if(this.contract != null){
            console.log(this.account + " " + ImgHash)
            const accounts:any = [this.account]
            this.contract.add(this.account,ImgHash).then(()=>{
              this.OnResetedForm()
              this.ngxLoader.stop()
              this.ToastrService.success("Successfully added the Event")
              this.router.navigate([''])
            },(err:any)=>{
              console.log("I am done")
              console.log(err)
            })
          }
        })
      } catch (error) {
        console.log(error)
      }
    }
  }
}
