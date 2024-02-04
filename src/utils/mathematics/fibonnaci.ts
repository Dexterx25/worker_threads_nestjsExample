import { method_exc } from 'src/modules/biologic_organism/DTO';
import { workerData, parentPort, isMainThread } from 'worker_threads';
import { Injectable } from "@nestjs/common";

export interface FibonacciNotRecursiveI {
    ultimate_number_seq: number;
    list_sequence: number[]
}
@Injectable()
export class FibonnaciHandler {
    //to faster fibonacci sequence
     FibonacciNotRecursive(count:number): FibonacciNotRecursiveI  {
        const fibSeq = [0, 1];
        for (let i = 2; i <= count-1; i++) {
            const nexNumber = fibSeq[i - 1] + fibSeq[i - 2];
            fibSeq[(i - 1) + 1] = nexNumber
        }
        return {
            list_sequence: fibSeq,
            ultimate_number_seq: fibSeq[fibSeq.length - 1]
        };
    }
    // Too heavy fibonacci sequence needs a worker
    public FibonacciRecirsive(n:number):FibonacciNotRecursiveI { 
            let number_ = 0
            if(n < 2) number_ = 1;
            else number_ = Number(this.FibonacciRecirsive(n - 2).ultimate_number_seq + this.FibonacciRecirsive(n - 1).ultimate_number_seq);
            return {
                list_sequence: [],
                ultimate_number_seq: number_
            }
    }
    async executeFibonaciWorker(){
        console.log('executing worker')
        console.log('workerData-->', workerData)
        if(!isMainThread) {
            if(workerData.method === method_exc['FASTER']) parentPort?.postMessage(this.FibonacciNotRecursive(workerData.count_bioOrganism))
            else if (workerData.method === method_exc['HEAVY']) parentPort?.postMessage(this.FibonacciRecirsive(workerData.count_bioOrganism))
            else  return parentPort?.postMessage(this.FibonacciNotRecursive(workerData.count_bioOrganism))
            
           }
    }
}




export  default FibonnaciHandler