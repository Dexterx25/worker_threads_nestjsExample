import { Injectable } from "@nestjs/common";
import { FibonacciNotRecursiveI, FibonnaciHandler } from "src/utils/mathematics";
import { Worker } from 'worker_threads';
import * as os from 'os';
import * as lodash from 'lodash'
import workerThreadFilePath from "src/config";
import { method_exc } from "./DTO";
@Injectable()
export class BiologicOrganismService {
    constructor(
      private readonly fibonnaciHandler: FibonnaciHandler
        ) {}
    public async sequenceExpansionFibonacci (count_process: number,count_bioOrganism: number, method: string): Promise<FibonacciNotRecursiveI| any> {
        const workersTasks: number[] = [];
        for (let i = 1; i <= count_process; i++) {
            workersTasks.push(count_bioOrganism)
        }
        const cpus = os.cpus().length - 1;
        let groupsTasks = lodash.chunk(workersTasks, Math.ceil(workersTasks.length/cpus));

        const promises: Promise<unknown>[] =  groupsTasks.flatMap(e => e).map(count_bioOrganism => new Promise((resolve, reject) => {
            const worker = new Worker(workerThreadFilePath, {
                workerData: {count_bioOrganism, method},
              });
              worker.on('message', (result:FibonacciNotRecursiveI) => {
                resolve(result);
              })
              worker.on('error', (error) => {
                reject(error);
              })
        }))
        
      return await Promise.all(promises)
    }

    public async sequenceExpansionFibonacciWithoutWorker (count_process: number,count_bioOrganism: number, _method: string): Promise<FibonacciNotRecursiveI| any> {
      const promises: Promise<unknown>[] = [];
      for (let i = 1; i <= count_process; i++) {
          promises.push(new Promise((resolve, _reject) => {
            if(_method === method_exc['FASTER']) resolve(this.fibonnaciHandler.FibonacciNotRecursive(count_bioOrganism))
            else if (_method === method_exc['HEAVY']) resolve(this.fibonnaciHandler.FibonacciRecirsive(count_bioOrganism))
            else resolve(this.fibonnaciHandler.FibonacciNotRecursive(count_bioOrganism))
          }))
      }
      return await Promise.all(promises)
  }
}